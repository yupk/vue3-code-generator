import { deepClone, randFieldId} from "@/utils/func.js";

 export default function (props) {

    function copy (origin) {
       
        let new_element = deepClone( origin);
        console.log('fieldName', new_element)
        new_element.__ID = randFieldId();
        

        if ('fieldName' in new_element.attrs){

            new_element.attrs.fieldName.__val__ = new_element.__ID

        }
        
        new_element.__formId = props.formId

        return new_element;
    }


    const onEnd = function (obj) {
        //console.log(obj);
    };



    return { copy, onEnd }
}