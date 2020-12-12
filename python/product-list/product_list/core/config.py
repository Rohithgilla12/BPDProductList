import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore


# TODO: Path fix
cred = credentials.Certificate('../private/serviceAccountKey.json')


firebase_admin.initialize_app(cred)

# db: firestore.client = firestore.client()

# docs = users_ref.stream()

# for doc in docs:
#     print(f'{doc.id} => {doc.to_dict()}')
