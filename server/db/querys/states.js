import { Query } from '../index';

const oneState = async (stateId) => Query('SELECT stateName FROM stateRef WHERE stateId = ?',[stateId]);
const allStates = async => Query("SELECT * FROM stateRef");

export default {
    oneState,
    allStates
}