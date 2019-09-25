import {MangoQuery} from 'nano'
import Nano  from 'nano'

export async function getRecordFromId(couch: Nano.DocumentScope<unknown>, id: string) {
    const query: MangoQuery = { selector: { id: id } };

    // const result = await couchDB.get(oid)
    const result = await couch.find(query)
    return result
}

export async function getRecordsFromState(couch: Nano.DocumentScope<unknown>, state: string) {
    const query: MangoQuery = { selector: { address: { $elemMatch: {state: state } } } };

    // const result = await couchDB.get(oid)
    const result = await couch.find(query)
    return result
}