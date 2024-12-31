import React from 'react';
import Label from '../../../../../../components/others/Label/Label';
import ListOfValue from '../../../../../../components/others/Fields/ListOfValue';
import SelectField from '../../../../../../components/others/Fields/SelectField';





const Corperate = () => {
    return (

        <div>
            <div class="w-full max-w-xl mt-2">
                <div class="md:flex md:items-center mb-2 ml-2">
                    <div class="md:w-1/3">
                        <Label label="Country of origin" required={true} fontSize="85%" />
                    </div>
                    <div className="md:w-2/3 md:mr-2">
                        <ListOfValue class="my_inputs" type="text" />
                    </div>
                </div>44444
            </div>
        </div>

    );
};

export default Corperate;