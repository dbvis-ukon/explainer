from abc import ABC, abstractmethod

class Explainer(ABC):

    @abstractmethod
    def __init__(self):
        self.explainer_name = ''
        super().__init__()
        pass

    @abstractmethod
    def explain(self, model, data, labels):
        pass

    def get_name(self):
        return self.explainer_name
