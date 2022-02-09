// Copyright 2017 The TensorFlow Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package org.tensorflow.tensorboard.vulcanize;

import static com.google.common.base.Preconditions.checkNotNull;
import static com.google.common.base.Verify.verify;
import static com.google.common.base.Verify.verifyNotNull;
import static java.nio.charset.StandardCharsets.UTF_8;

import com.google.common.base.CharMatcher;
import com.google.common.base.Joiner;
import com.google.common.base.Optional;
import com.google.common.base.Splitter;
import com.google.common.collect.HashMultimap;
import com.google.common.collect.ImmutableList;
import com.google.common.collect.ImmutableMultimap;
import com.google.common.collect.ImmutableSet;
import com.google.common.collect.Iterables;
import com.google.common.collect.Lists;
import com.google.common.collect.Multimap;
import com.google.javascript.jscomp.BasicErrorManager;
import com.google.javascript.jscomp.CheckLevel;
import com.google.javascript.jscomp.CompilationLevel;
import com.google.javascript.jscomp.Compiler;
import com.google.javascript.jscomp.CompilerOptions;
import com.google.javascript.jscomp.DiagnosticGroup;
import com.google.javascript.jscomp.DiagnosticGroups;
import com.google.javascript.jscomp.DiagnosticType;
import com.google.javascript.jscomp.JSError;
import com.google.javascript.jscomp.ModuleIdentifier;
import com.google.javascript.jscomp.PropertyRenamingPolicy;
import com.google.javascript.jscomp.Result;
import com.google.javascript.jscomp.SourceFile;
import com.google.javascript.jscomp.WarningsGuard;
import com.google.javascript.jscomp.deps.ModuleLoader;
import com.google.protobuf.TextFormat;
import io.bazel.rules.closure.Webpath;
import io.bazel.rules.closure.webfiles.BuildInfo.Webfiles;
import io.bazel.rules.closure.webfiles.BuildInfo.WebfilesSource;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Deque;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Attribute;
import org.jsoup.nodes.Comment;
import org.jsoup.nodes.DataNode;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.nodes.Html5Printer;
import org.jsoup.nodes.Node;
import org.jsoup.nodes.TextNode;
import org.jsoup.parser.Parser;
import org.jsoup.parser.Tag;

/** Simple one-off solution for TensorBoard vulcanization. */
public final class Vulcanize {

  private static final Pattern INLINE_SOURCE_MAP_PATTERN =
      Pattern.compile("//# sourceMappingURL=.*");

  private static final Pattern IGNORE_PATHS_PATTERN =
      Pattern.compile("/(?:polymer|marked-element)/.*");

  private static final ImmutableSet<String> EXTRA_JSDOC_TAGS =
      ImmutableSet.of("attribute", "hero", "group", "required");

  private static final Pattern WEBPATH_PATTERN = Pattern.compile("//~~WEBPATH~~([^\n]+)");

  private static final Parser parser = Parser.htmlParser();
  private static final Map<Webpath, Path> webfiles = new HashMap<>();
  private static final Set<Webpath> alreadyInlined = new HashSet<>();
  private static final Set<String> legalese = new HashSet<>();
  private static final List<String> licenses = new ArrayList<>();
  private static final List<Webpath> stack = new ArrayList<>();
  private static final List<SourceFile> externs = new ArrayList<>();
  private static final List<SourceFile> sourcesFromJsLibraries = new ArrayList<>();
  private static final Map<Webpath, String> sourcesFromScriptTags = new LinkedHashMap<>();
  private static final Map<Webpath, Node> sourceTags = new LinkedHashMap<>();
  private static final Multimap<Webpath, String> suppressions = HashMultimap.create();
  private static CompilationLevel compilationLevel;
  private static Webpath outputPath;
  private static Node firstCompiledScript;
  private static Node firstScript;
  private static Node licenseComment;
  private static int insideDemoSnippet;
  private static boolean testOnly;
  private static boolean wantsCompile;
  private static List<Pattern> ignoreRegExs = new ArrayList<>();

  // This is the default argument to Vulcanize for when the path_regexs_for_noinline attribute in
  // third_party/tensorboard/defs/vulcanize.bzl is not set.
  private static final String NO_NOINLINE_FILE_PROVIDED = "NO_REGEXS";

  public static void main(String[] args) throws IOException {
    compilationLevel = CompilationLevel.fromString(args[0]);
    wantsCompile = args[1].equals("true");
    testOnly = args[2].equals("true");
    Webpath inputPath = Webpath.get(args[3]);
    outputPath = Webpath.get(args[4]);
    Path output = Paths.get(args[5]);
    if (!args[6].equals(NO_NOINLINE_FILE_PROVIDED)) {
      String ignoreFile = new String(Files.readAllBytes(Paths.get(args[6])), UTF_8);
      Arrays.asList(ignoreFile.split("\n")).forEach(
          (str) -> ignoreRegExs.add(Pattern.compile(str)));
    }
    for (int i = 7; i < args.length; i++) {
      if (args[i].endsWith(".js")) {
        String code = new String(Files.readAllBytes(Paths.get(args[i])), UTF_8);
        SourceFile sourceFile = SourceFile.fromCode(args[i], code);
        if (code.contains("@externs")) {
          externs.add(sourceFile);
        } else {
          sourcesFromJsLibraries.add(sourceFile);
        }
        continue;
      }
      if (!args[i].endsWith(".pbtxt")) {
        continue;
      }
      Webfiles manifest = loadWebfilesPbtxt(Paths.get(args[i]));
      for (WebfilesSource src : manifest.getSrcList()) {
        webfiles.put(Webpath.get(src.getWebpath()), Paths.get(src.getPath()));
      }
    }
    stack.add(inputPath);
    Document document = parse(Files.readAllBytes(webfiles.get(inputPath)));
    transform(document);
    if (wantsCompile) {
      compile();
    } else if (firstScript != null) {
      firstScript.before(
          new Element(Tag.valueOf("script"), firstScript.baseUri())
              .appendChild(new DataNode("var CLOSURE_NO_DEPS = true;", firstScript.baseUri())));
      for (SourceFile source : sourcesFromJsLibraries) {
        String code = source.getCode();
        firstScript.before(
            new Element(Tag.valueOf("script"), firstScript.baseUri())
                .appendChild(new DataNode(code, firstScript.baseUri())));
      }
    }
    if (licenseComment != null) {
      licenseComment.attr("comment", String.format("\n%s\n", Joiner.on("\n\n").join(licenses)));
    }
    Files.write(
        output,
        Html5Printer.stringify(document).getBytes(UTF_8),
        StandardOpenOption.WRITE,
        StandardOpenOption.CREATE,
        StandardOpenOption.TRUNCATE_EXISTING);
  }

  private static void transform(Node root) throws IOException {
    Node node = checkNotNull(root);
    Node newNode;
    while (true) {
      newNode = enterNode(node);
      if (node.equals(root)) {
        root = newNode;
      }
      node = newNode;
      if (node.childNodeSize() > 0) {
        node = node.childNode(0);
      } else {
        while (true) {
          newNode = leaveNode(node);
          if (node.equals(root)) {
            root = newNode;
          }
          node = newNode;
          if (node.equals(root)) {
            return;
          }
          Node next = node.nextSibling();
          if (next == null) {
            if (node.parentNode() == null) {
              return;
            }
            node = verifyNotNull(node.parentNode(), "unexpected root: %s", node);
          } else {
            node = next;
            break;
          }
        }
      }
    }
  }

  private static boolean isExternalCssNode(Node node) {
    if (node.nodeName().equals("link")
        && node.attr("rel").equals("stylesheet")
        && !node.attr("href").isEmpty()) {
      return true;
    }
    if (node.nodeName().equals("link")
        && node.attr("rel").equals("import")
        && (node.attr("type").equals("css")
            || node.attr("type").equals("text/css"))
        && !node.attr("href").isEmpty()) {
      return true;
    }
    return false;
  }

  private static Node enterNode(Node node) throws IOException {
    if (node.nodeName().equals("demo-snippet")) {
      insideDemoSnippet++;
    }
    if (insideDemoSnippet > 0) {
      return node;
    }
    if (node instanceof Element) {
      String href = node.attr("href");
      // Ignore any files that match any of the ignore regular expressions.
      boolean ignoreFile = false;
      for (Pattern pattern : ignoreRegExs) {
        if (pattern.matcher(href).find()) {
          ignoreFile = true;
          break;
        }
      }
      if (!getAttrTransitive(node, "vulcanize-noinline").isPresent() && !ignoreFile) {
        if (isExternalCssNode(node)
            && !shouldIgnoreUri(href)) {
          node = visitStylesheet(node);
        } else if (node.nodeName().equals("link")
            && node.attr("rel").equals("import")) {
          // Inline HTML.
          node = visitHtmlImport(node);
        } else if (node.nodeName().equals("script")
            && !shouldIgnoreUri(node.attr("src"))
            && !node.hasAttr("jscomp-ignore")) {
          if (wantsCompile) {
            node = visitScript(node);
          } else {
            node = inlineScript(node);
          }
        }
      }
      rootifyAttribute(node, "href");
      rootifyAttribute(node, "src");
      rootifyAttribute(node, "action");
      rootifyAttribute(node, "assetpath");
    } else if (node instanceof Comment) {
      String text = ((Comment) node).getData();
      if (text.contains("@license")) {
        handleLicense(text);
        if (licenseComment == null) {
          licenseComment = node;
        } else {
          node = replaceNode(node, new TextNode("", node.baseUri()));
        }
      } else {
        node = replaceNode(node, new TextNode("", node.baseUri()));
      }
    }
    return node;
  }

  private static Node leaveNode(Node node) {
    if (node instanceof Document) {
      stack.remove(stack.size() - 1);
    } else if (node.nodeName().equals("demo-snippet")) {
      insideDemoSnippet--;
    }
    return node;
  }

  private static Node visitHtmlImport(Node node) throws IOException {
    Webpath href = me().lookup(Webpath.get(node.attr("href")));
    if (alreadyInlined.add(href)) {
      stack.add(href);
      Document subdocument = parse(Files.readAllBytes(getWebfile(href)));
      for (Attribute attr : node.attributes()) {
        subdocument.attr(attr.getKey(), attr.getValue());
      }
      return replaceNode(node, subdocument);
    } else {
      return replaceNode(node, new TextNode("", node.baseUri()));
    }
  }

  private static Node visitScript(Node node) throws IOException {
    Webpath path;
    String script;
    if (node.attr("src").isEmpty()) {
      path = makeSyntheticName(".js");
      script = getInlineScriptFromNode(node);
    } else {
      path = me().lookup(Webpath.get(node.attr("src")));
      script = new String(Files.readAllBytes(getWebfile(path)), UTF_8);
      script = INLINE_SOURCE_MAP_PATTERN.matcher(script).replaceAll("");
    }
    boolean wantsMinify = getAttrTransitive(node, "jscomp-minify").isPresent();
    if (node.attr("src").endsWith(".min.js")
        || getAttrTransitive(node, "jscomp-nocompile").isPresent()
        || wantsMinify) {
      if (wantsMinify) {
        script = minify(path, script);
      }
      Node newScript =
          new Element(Tag.valueOf("script"), node.baseUri(), node.attributes())
              .appendChild(new DataNode(script, node.baseUri()))
              .removeAttr("src")
              .removeAttr("jscomp-minify")
              .removeAttr("jscomp-nocompile");
      if (firstCompiledScript != null) {
        firstCompiledScript.before(newScript);
        return replaceNode(node, new TextNode("", node.baseUri()));
      } else {
        return replaceNode(node, newScript);
      }
    } else {
      if (firstCompiledScript == null) {
        firstCompiledScript = node;
      }
      sourcesFromScriptTags.put(path, script);
      sourceTags.put(path, node);
      Optional<String> suppress = getAttrTransitive(node, "jscomp-suppress");
      if (suppress.isPresent()) {
        if (suppress.get().isEmpty()) {
          suppressions.put(path, "*");
        } else {
          suppressions.putAll(path, Splitter.on(' ').split(suppress.get()));
        }
      }
      return node;
    }
  }

  private static Node visitStylesheet(Node node) throws IOException {
    Webpath href = me().lookup(Webpath.get(node.attr("href")));
    return replaceNode(
        node,
        new Element(Tag.valueOf("style"), node.baseUri(), node.attributes())
            .appendChild(
                new DataNode(
                    new String(Files.readAllBytes(getWebfile(href)), UTF_8), node.baseUri()))
            .removeAttr("rel")
            .removeAttr("href"));
  }

  private static Node inlineScript(Node node) throws IOException {
    Node result;
    if (node.attr("src").isEmpty()) {
      result = node;
    } else {
      Webpath href = me().lookup(Webpath.get(node.attr("src")));
      String code = new String(Files.readAllBytes(getWebfile(href)), UTF_8);
      code = code.replace("</script>", "</JAVA_SCRIIIIPT/>");
      code = INLINE_SOURCE_MAP_PATTERN.matcher(code).replaceAll("");
      result = replaceNode(
          node,
          new Element(Tag.valueOf("script"), node.baseUri(), node.attributes())
              .appendChild(new DataNode(code, node.baseUri()))
              .removeAttr("src"));
    }
    if (firstScript == null) {
      firstScript = result;
    }
    return result;
  }

  private static Optional<String> getAttrTransitive(Node node, String attr) {
    while (node != null) {
      if (node.hasAttr(attr)) {
        return Optional.of(node.attr(attr));
      }
      node = node.parent();
    }
    return Optional.absent();
  }

  private static Node replaceNode(Node oldNode, Node newNode) {
    oldNode.replaceWith(newNode);
    return newNode;
  }

  private static Path getWebfile(Webpath path) {
    return verifyNotNull(webfiles.get(path), "Bad ref: %s -> %s", me(), path);
  }

  private static void compile() {
    if (sourcesFromScriptTags.isEmpty()) {
      return;
    }

    CompilerOptions options = new CompilerOptions();
    compilationLevel.setOptionsForCompilationLevel(options);
    options.setModuleResolutionMode(ModuleLoader.ResolutionMode.NODE);

    // Nice options.
    options.setColorizeErrorOutput(true);
    options.setContinueAfterErrors(true);
    options.setLanguageIn(CompilerOptions.LanguageMode.ECMASCRIPT_2017);
    options.setLanguageOut(CompilerOptions.LanguageMode.ECMASCRIPT5);
    options.setGenerateExports(true);
    options.setStrictModeInput(false);
    options.setExtraAnnotationNames(EXTRA_JSDOC_TAGS);

    // So we can chop JS binary back up into the original script tags.
    options.setPrintInputDelimiter(true);
    options.setInputDelimiter("//~~WEBPATH~~%name%");

    // Optimizations that are too advanced for us right now.
    options.setPropertyRenaming(PropertyRenamingPolicy.OFF);
    options.setCheckGlobalThisLevel(CheckLevel.OFF);
    options.setRemoveUnusedPrototypeProperties(false);
    options.setRemoveUnusedPrototypePropertiesInExterns(false);
    options.setRemoveUnusedClassProperties(false);

    // Dependency management.
    options.setClosurePass(true);
    options.setManageClosureDependencies(true);
    // TODO turn dependency pruning back on. ES6 modules are currently (incorrectly) considered moochers.
    // Once the compiler no longer considers them moochers the dependencies will be in an incorrect order.
    // The compiler will put moochers first, then other explicit entry points (if something is an entry
    // point and a moocher it goes first). vz-example-viewer.ts generates an ES6 module JS, and it will
    // soon no longer be considered a moocher and be moved after its use in some moochers. The TS 
    // generation should not generate an ES6 module (a file with just goog.requires is a moocher!), or
    // vz-example-viewer should be imported by the code that uses it rather than rely on the input order 
    // to the compiler. Or we should verify that the input order to the compiler is 100% correct and turn
    // off dependency sorting.
    options.getDependencyOptions().setDependencyPruning(false);
    options.getDependencyOptions().setDependencySorting(true);
    options.getDependencyOptions().setMoocherDropping(false);
    options.getDependencyOptions()
        .setEntryPoints(
            sourceTags
                .keySet()
                .stream()
                .map(Webpath::toString)
                .map(ModuleIdentifier::forFile)
                .collect(Collectors.toList()));

    // Polymer pass.
    options.setPolymerVersion(1);

    // Debug flags.
    if (testOnly) {
      options.setPrettyPrint(true);
      options.setGeneratePseudoNames(true);
      options.setExportTestFunctions(true);
    }

    // Don't print warnings from <script jscomp-suppress="group1 group2" ...> tags.
    ImmutableMultimap<DiagnosticType, String> diagnosticGroups = initDiagnosticGroups();
    options.addWarningsGuard(
        new WarningsGuard() {
          @Override
          public CheckLevel level(JSError error) {
            if (error.sourceName == null) {
              return null;
            }
            if (error.getDefaultLevel() == CheckLevel.WARNING
                && isErrorFromTranspiledTypescriptCode(error)) {
              // Let's put our faith in the TypeScript compiler. At least until we have tsickle as
              // part of our build process.
              return CheckLevel.OFF;
            }
            if (error.getDefaultLevel() == CheckLevel.WARNING
                && (error.sourceName.startsWith("/iron-")
                    || error.sourceName.startsWith("/neon-")
                    || error.sourceName.startsWith("/paper-"))) {
              // Suppress warnings in the Polymer standard libraries.
              return CheckLevel.OFF;
            }
            if (error.sourceName.startsWith("javascript/externs")
                || error.sourceName.contains("com_google_javascript_closure_compiler_externs")) {
              // TODO(@jart): Figure out why these "mismatch of the removeEventListener property on
              //             type" warnings are showing up.
              //             https://github.com/google/closure-compiler/pull/1959
              return CheckLevel.OFF;
            }
            if (IGNORE_PATHS_PATTERN.matcher(error.sourceName).matches()) {
              return CheckLevel.OFF;
            }
            if ((error.sourceName.startsWith("/tf-") || error.sourceName.startsWith("/vz-"))
                && error.getType().key.equals("JSC_VAR_MULTIPLY_DECLARED_ERROR")) {
              return CheckLevel.OFF; // TODO(@jart): Remove when tf/vz components/plugins are ES6 modules.
            }
            if (error.getType().key.equals("JSC_POLYMER_UNQUALIFIED_BEHAVIOR")
                || error.getType().key.equals("JSC_POLYMER_UNANNOTATED_BEHAVIOR")) {
              return CheckLevel.OFF; // TODO(@jart): What is wrong with this thing?
            }
            Collection<String> codes = suppressions.get(Webpath.get(error.sourceName));
            if (codes.contains("*") || codes.contains(error.getType().key)) {
              return CheckLevel.OFF;
            }
            for (String group : diagnosticGroups.get(error.getType())) {
              if (codes.contains(group)) {
                return CheckLevel.OFF;
              }
            }
            return null;
          }
        });

    // Get reverse topological script tags and their web paths, which js_library stuff first.
    List<SourceFile> sauce = Lists.newArrayList(sourcesFromJsLibraries);
    for (Map.Entry<Webpath, String> source : sourcesFromScriptTags.entrySet()) {
      sauce.add(SourceFile.fromCode(source.getKey().toString(), source.getValue()));
    }

    // Compile everything into a single script.
    Compiler compiler = new Compiler();
    compiler.disableThreads();
    Result result = compiler.compile(externs, sauce, options);
    if (!result.success) {
      System.exit(1);
    }
    String jsBlob = compiler.toSource();

    // Split apart the JS blob and put it back in the original <script> locations.
    Deque<Map.Entry<Webpath, Node>> tags = new ArrayDeque<>();
    tags.addAll(sourceTags.entrySet());
    Matcher matcher = WEBPATH_PATTERN.matcher(jsBlob);
    verify(matcher.find(), "Nothing found in compiled JS blob!");
    Webpath path = Webpath.get(matcher.group(1));
    int start = 0;
    while (matcher.find()) {
      if (sourceTags.containsKey(path)) {
        swapScript(tags, path, jsBlob.substring(start, matcher.start()));
        start = matcher.start();
      }
      path = Webpath.get(matcher.group(1));
    }
    swapScript(tags, path, jsBlob.substring(start));
    verify(tags.isEmpty(), "<script> wasn't compiled: %s", tags);
  }

  private static boolean isErrorFromTranspiledTypescriptCode(JSError error) {
    // We perform this check by looking for a concomitant .d.ts webfile which is generated by the
    // TypeScript compiler. Ideally we would use SourceExcerptProvider to determine the original
    // source name, but WarningsGuard objects do not appear to have access to that.
    String path = error.sourceName;
    if (!path.endsWith(".js")) {
      return false;
    }
    return webfiles.containsKey(Webpath.get(path.substring(0, path.length() - 3) + ".d.ts"));
  }

  private static void swapScript(
      Deque<Map.Entry<Webpath, Node>> tags, Webpath path, String script) {
    verify(!tags.isEmpty(), "jscomp compiled %s after last <script>?!", path);
    Webpath want = tags.getFirst().getKey();
    verify(path.equals(want), "<script> tag for %s should come before %s", path, want);
    Node tag = tags.removeFirst().getValue();
    tag.replaceWith(
        new Element(Tag.valueOf("script"), tag.baseUri())
            .appendChild(new DataNode(script, tag.baseUri())));
  }

  private static String minify(Webpath path, String script) {
    CompilerOptions options = new CompilerOptions();
    options.skipAllCompilerPasses();
    options.setLanguageIn(CompilerOptions.LanguageMode.ECMASCRIPT_2016);
    options.setLanguageOut(CompilerOptions.LanguageMode.ECMASCRIPT5);
    options.setContinueAfterErrors(true);
    CompilationLevel.SIMPLE_OPTIMIZATIONS.setOptionsForCompilationLevel(options);
    if (testOnly) {
      options.setPrettyPrint(true);
      options.setGeneratePseudoNames(true);
    }
    Compiler compiler = new Compiler(new JsPrintlessErrorManager());
    compiler.disableThreads();
    compiler.compile(
        ImmutableList.of(),
        ImmutableList.of(SourceFile.fromCode(path.toString(), script)),
        options);
    return compiler.toSource();
  }

  private static void handleLicense(String text) {
    if (legalese.add(CharMatcher.whitespace().removeFrom(text))) {
      licenses.add(CharMatcher.anyOf("\r\n").trimFrom(text));
    }
  }

  private static Webpath me() {
    return Iterables.getLast(stack);
  }

  private static Webpath makeSyntheticName(String extension) {
    String me = me().toString();
    Webpath result = Webpath.get(me + extension);
    int n = 2;
    while (sourcesFromScriptTags.containsKey(result)) {
      result = Webpath.get(String.format("%s-%d%s", me, n++, extension));
    }
    return result;
  }

  private static void rootifyAttribute(Node node, String attribute) {
    String value = node.attr(attribute);
    if (value.isEmpty()) {
      return;
    }
    Webpath uri = Webpath.get(value);
    if (webfiles.containsKey(uri)) {
      node.attr(attribute, outputPath.getParent().relativize(uri).toString());
    }
  }

  private static String getInlineScriptFromNode(Node node) {
    StringBuilder sb = new StringBuilder();
    for (Node child : node.childNodes()) {
      if (child instanceof DataNode) {
        sb.append(((DataNode) child).getWholeData());
      }
    }
    return sb.toString();
  }

  private static Document parse(byte[] bytes) {
    return parse(new ByteArrayInputStream(bytes));
  }

  private static Document parse(InputStream input) {
    Document document;
    try {
      document = Jsoup.parse(input, null, "", parser);
    } catch (IOException e) {
      throw new AssertionError("I/O error when parsing byte array D:", e);
    }
    document.outputSettings().indentAmount(0);
    document.outputSettings().prettyPrint(false);
    return document;
  }

  private static Webfiles loadWebfilesPbtxt(Path path) throws IOException {
    verify(path.toString().endsWith(".pbtxt"), "Not a pbtxt file: %s", path);
    Webfiles.Builder build = Webfiles.newBuilder();
    TextFormat.getParser().merge(new String(Files.readAllBytes(path), UTF_8), build);
    return build.build();
  }

  private static boolean shouldIgnoreUri(String uri) {
    return uri.startsWith("#")
        || uri.endsWith("/")
        || uri.contains("//")
        || uri.startsWith("data:")
        || uri.startsWith("javascript:")
        // The following are intended to filter out URLs with Polymer variables.
        || (uri.contains("[[") && uri.contains("]]"))
        || (uri.contains("{{") && uri.contains("}}"));
  }

  private static ImmutableMultimap<DiagnosticType, String> initDiagnosticGroups() {
    DiagnosticGroups groups = new DiagnosticGroups();
    Multimap<DiagnosticType, String> builder = HashMultimap.create();
    for (Map.Entry<String, DiagnosticGroup> group : groups.getRegisteredGroups().entrySet()) {
      for (DiagnosticType type : group.getValue().getTypes()) {
        builder.put(type, group.getKey());
      }
    }
    return ImmutableMultimap.copyOf(builder);
  }

  private static final class JsPrintlessErrorManager extends BasicErrorManager {

    @Override
    public void println(CheckLevel level, JSError error) {}

    @Override
    public void printSummary() {}
  }
}
