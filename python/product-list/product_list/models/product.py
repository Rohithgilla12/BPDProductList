import jsonpickle


class Product:
    def __init__(self, id: str, name: str, packaging: str):
        self.id = id
        self.name = name
        self.packaging = packaging

    @classmethod
    def from_dict(cls, adict):
        product: Product = Product(
            id=adict['Code'],
            name=adict['Name'],
            packaging=adict['Packing'],
        )
        return product

    @classmethod
    def from_json(cls, obj):
        product: Product = jsonpickle.decode(obj)
        return product

    def to_json(self):
        return jsonpickle.encode(self, unpicklable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'packaging': self.packaging,
        }

    def __eq__(self, other):
        return self.to_dict() == other.to_dict()

    def __str__(self):
        return f'Batch ID: {self.id} Name: {self.name} Packing: {self.packaging}'
