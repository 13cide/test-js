import { CollectionReference, Query, Timestamp } from '@google-cloud/firestore'
import { Inject, Injectable, Logger } from '@nestjs/common'
import { getUniqueId, time } from 'src/helpers'

import { ExampleFilter } from '../dto'
import { ExampleDocument } from '../entities/example.document'

@Injectable()
export class ExampleRepository {
  private logger: Logger = new Logger(ExampleRepository.name)

  constructor(
    @Inject(ExampleDocument.collectionName)
    private collection: CollectionReference<ExampleDocument>,
  ) {}

  async getDataByDocumentId(id: string): Promise<ExampleDocument | null> {
    const snapshot = await this.collection.doc(id).get()

    if (!snapshot.exists) {
      return null
    } else {
      return snapshot.data() || null
    }
  }

  /**
  * Метод возвращающий значение документа и доп методы по работе с документом коллекции, нас будет интересовать метод .update(...props) 
  **/
  async getUpdate(id: string) {
    const doc = await this.collection.doc(id)
    const snapshot = await doc.get()

    if (!snapshot.exists) {
      return { doc: null, data: null }
    } else {
      return { doc, data: snapshot.data() }
    }
  }

  /**
  * По сути, именно этот метод у нас будет отвечать за добавление новых фильтров в запрос за коллекцией
  * На данный момент, использую только флаг isPublished
  **/
  private findGenerator(filter: ExampleFilter) {
    const collectionRef = this.collection
    let query: Query<ExampleDocument> = collectionRef

    if (typeof filter?.isPublished === 'boolean') {
      query = query.where('isPublished', '==', filter.isPublished)
    }

    return query
  }

  async find(filter: ExampleFilter): Promise<ExampleDocument[]> {
    const list: ExampleDocument[] = []
    let query = this.findGenerator(filter)
    query = query.orderBy('createdAt', 'desc')

    const snapshot = await query.get()

    snapshot.forEach((doc) => list.push(doc.data()))

    return list
  }

  async create(payload: Pick<ExampleDocument, 'title'> & Partial<ExampleDocument>) {
    const validPayload = this.getValidProperties(payload)
    const document = await this.collection.doc(validPayload.id)
    await document.set(validPayload)

    return validPayload
  }

  /**
  * Этот метод нужен нам для подготовки данных перед записью в firestore
  * Документ на входе может быть без id и других полей, поэтому организуем фолбэк значения и установку свйоств времени работы с документом
  * Флаг newUpdatedAt используем для установки текущей даты в поле updatedAt
  **/
  public getValidProperties(
    document: Omit<ExampleDocument, 'id' | 'isPublished'> & { id?: string; isPublished?: boolean | null },
    newUpdatedAt = false,
  ) {
    const dueDateMillis = time().valueOf()
    const createdAt = Timestamp.fromMillis(dueDateMillis)

    return {
      id: document.id || getUniqueId(),
      title: document.title,
      text: document.text ?? null,
      isPublished: document.isPublished ?? false,
      createdAt: document.createdAt ?? createdAt,
      updatedAt: newUpdatedAt ? createdAt : (document.updatedAt ?? null),
    }
  }
}