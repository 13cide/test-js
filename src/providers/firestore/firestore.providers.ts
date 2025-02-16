import { ExampleDocument } from "src/modules/example/entities/example.document"

export const FirestoreDatabaseProvider = 'firestoredb'
export const FirestoreOptionsProvider = 'firestoreOptions'
export const FirestoreCollectionProviders: string[] = [ExampleDocument.collectionName]