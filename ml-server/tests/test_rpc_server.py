import unittest
from rpc_server import classificationModel

class TestServer(unittest.TestCase):

    def test_classificationModel(self):
        input = ""
        result = classificationModel(input)
        self.assertTrue( result in [True, False])

if __name__ == '__main__':
    unittest.main()

# ./venv/bin/python -m unittest