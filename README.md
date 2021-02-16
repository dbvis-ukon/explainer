# explAIner

This repository contains the source code for [_explAIner_](https://explainer.ai/) -- the framework for explainable AI and interactive machine learning.


## Architecture

The framework consists of four plugins, which represent the _stages of explanation_, namely

* Understanding
* Diagnosis
* Refinement
* Reporting


## Repository Structure

### Folders 
The repository contains 4 folders:

* `backend/`
  This folder contains the python backend for the high-level (model in-/output) explanations.

* `tensorboard-explainer-plugin/`  
  This folder contains the actual explAIner code. It has the following sub-folders:
  * `explainer_plugins/`  
    * `_1_understanding/`  
      Plugin for understanding. Data-independent explanations.
    * `_2_diagnosis/`  
      Plugin for diagnosis. Debugging of NN graph.
    * `_3_refinement/`  
      Plugin for refinement. Recommendations on improvements.
    * `_4_reporting/`  
      Plugin for reporting. Summarizes the findings from previous steps.
    * `common/`  
      Parts that are used in more than one plugin.
  * `explainer_tensorboard/`  
    The modified TensorBoard executable, with explAIner plugins injected.


## Building and Starting

To create example logs for explAIner, run the following command and wait for it to finish:

```Bash
docker-compose up --build --remove-orphans explainer_summary
```

To build and start the explAIner TensorBoard executable (together with custom backend servers):

```Bash
docker-compose up --build --remove-orphans -d explainer_tensorboard
```
Although the containers should be up and running after a few seconds, it might take a while until the code is fully compiled and the system gets available under `http://127.0.0.1:6006`.

## Citing this Repository

To reference this repository, please cite the original explAIner publication (pre-print available on [_arXiv.org_](https://arxiv.org/abs/1908.00087)):

```
T. Spinner, U. Schlegel, H. Schafer, and M. El-Assady, “explAIner: A Visual Analytics Framework for Interactive and Explainable Machine Learning,” IEEE Trans. on Vis. and Computer Graphics, vol. 26, no. 1, Art. no. 1, 2020, doi: 10.1109/tvcg.2019.2934629.
```

### BibTeX

```
@ARTICLE{SpinnerEtAl2020,
  author = {Thilo Spinner and Udo Schlegel and Hanna Schäfer and Mennatallah El-Assady},
  title = {{explAIner}: A Visual Analytics Framework for Interactive and Explainable Machine Learning},
  journal = {{IEEE} Transactions on Visualization and Computer Graphics},
  year = {2020},
  volume = {26},
  number = {1},
  pages = {1064-1074},
  doi = {10.1109/TVCG.2019.2934629},
}
```