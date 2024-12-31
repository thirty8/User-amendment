import {useState,useEffect,React} from 'react';
import CustomTable from '../../../../../../../components/others/customtable';


function ChargesRate({chargeRate}) {
  return (
    <div>
      <CustomTable headers={["Minimum Balance","Maximum Balance","Int. Variance","Pen. Variance","Base Rate","Charge Rate","Penalty Rate"]} data={chargeRate} />
    </div>
  );
}

export default ChargesRate;