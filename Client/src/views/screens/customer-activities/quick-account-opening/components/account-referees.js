import React from 'react'
import InputField from "../../../../../components/others/Fields/InputField";
import Label from "../../../../../components/others/Label/Label";
import SelectField from "../../../../../components/others/Fields/SelectField";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import TextAreaField from "../../../../../components/others/Fields/TextArea";
import ListOfValue from "../../../../../components/others/Fields/ListOfValue";
import DataTable from "../../../../../components/others/Datatable/DataTable";
import ButtonType from "../../../../../components/others/Button/ButtonType";

const Account_Referees = ({onClick, isLoading, setIsLoading, isPEP, setIsPEP, isBlacklisted, setIsBlacklisted, isDuplicate, setIsDuplicate}) => {
  return (
    <div>
      <div className="border rounded">
        <div className="md:flex justify-center w-full">
          {/* **************************************** */}
                <div className="w-full max-w-xl">
                    {/* Types of Referees */}
                      <div class="w-full max-w-xl mt-2">
                          <div class="md:flex md:items-center mb-2 ml-2">
                              <div class="md:w-1/3">
                                  <Label label="Types of Referees" required={true} fontSize="85%" />
                              </div>
                              <div class="md:w-2/3 md:mr-3">
                                  <SelectField first_option="None" second_option="Female"  />
                              </div>
                          </div>
                      </div>

                    {/* Account Number */}
                    <div class="w-full max-w-xl mt-2">
                      <div class="md:flex md:items-center mb-2 ml-2">
                          <div class="md:w-1/3">
                              <Label label="Account Number" required={true} fontSize="85%" />
                          </div>
                          <div class="md:w-2/3 ">
                              <input className="risk_label" type="text" />
                          </div>
                      </div>
                    </div>

                    {/* Bank Name */}
                    <div class="w-full max-w-xl mt-2">
                      <div class="md:flex md:items-center mb-2 ml-2">
                          <div class="md:w-1/3">
                              <Label label="Bank Name" required={true} fontSize="85%" />
                          </div>
                          <div className="md:w-2/4 ">
                              <ListOfValue />
                          </div>
                      </div>
                    </div>

                    {/* Account Name */}
                    <div class="w-full max-w-xl mt-2">
                      <div class="md:flex md:items-center mb-2 ml-2">
                          <div class="md:w-1/3">
                              <Label label="Account Name" required={true} fontSize="85%" />
                          </div>
                          <div className="md:w-2/3 md:mr-2">
                              <input class="my_inputs" type="text" />
                          </div>
                      </div>
                    </div>

                    {/* Resident Address */}
                    <div class="w-full max-w-xl mt-2">
                      <div class="md:flex md:items-center mb-2 ml-2">
                          <div class="md:w-1/3">
                              <Label label="Resident Address" required={true} fontSize="85%" />
                          </div>
                          <div className="md:w-2/3 md:mr-2">
                              <input class="my_inputs" type="text" />
                          </div>
                      </div>
                    </div>

                    {/* Email Address */}
                    <div class="w-full max-w-xl mt-2">
                      <div class="md:flex md:items-center mb-2 ml-2">
                          <div class="md:w-1/3">
                              <Label label="Email Address" fontSize="85%" />
                          </div>
                          <div className="md:w-2/3 md:mr-2">
                              <input class="my_inputs" type="text" />
                          </div>
                      </div>
                    </div>

                    {/* Relationship */}
                    <div class="w-full max-w-xl mt-2">
                        <div class="md:flex md:items-center mb-2 ml-2">
                            <div class="md:w-1/3">
                                <Label label="Relationship" required={true} fontSize="85%" />
                            </div>
                            <div class="md:w-2/3 md:mr-3">
                                <SelectField first_option="None" second_option="Female"  />
                            </div>
                        </div>
                    </div>

                    {/* Number of years known */}
                    <div class="w-full max-w-xl mt-2">
                      <div class="md:flex md:items-center mb-2 ml-2">
                          <div class="md:w-1/3">
                              <Label label="No of years known" required={true} fontSize="85%" />
                          </div>
                          <div class="md:w-2/3 ">
                              <input className="risk_label" type="text" />
                          </div>
                      </div>
                    </div>

                   {/* Phone Number */}
                   <div class="w-full max-w-xl mt-2">
                      <div class="md:flex md:items-center mb-2 ml-2">
                          <div class="md:w-1/3">
                              <Label label="Phone Number" required={true} fontSize="85%" />
                          </div>
                          <div class="md:w-2/3 ">
                              <input className="risk_label" type="text" />
                          </div>
                      </div>
                    </div>

                
                </div>
          {/* **************************************** */}

          

        </div>

        {/* <div className="flex justify-end mr-5">
          <ButtonComponent onClick={onClick} label="Save" buttonBackgroundColor="green" buttonWidth="120px" buttonHeight="30px" />
            {isLoading && <div>Loading...</div>}
            {isPEP && <div>This person is a PEP.</div>}
            {isBlacklisted && <div>This person is blacklisted.</div>}
            {isDuplicate && <div>This person is a duplicate.</div>}
        </div> */}

      
      </div>
    </div>
  )
}

export default Account_Referees