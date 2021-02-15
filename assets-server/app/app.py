import os
import sys
from http.server import HTTPServer, SimpleHTTPRequestHandler

class CORSRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        return super(CORSRequestHandler, self).end_headers()


def main(argv):
    if argv[1]:
        path = os.path.abspath(argv[1])

        if os.path.isdir(path):
            print("Serving path " + path)
            os.chdir(path)

    httpd = HTTPServer(('0.0.0.0', 8000), CORSRequestHandler)
    httpd.serve_forever()


if __name__ == "__main__":
    main(sys.argv)
