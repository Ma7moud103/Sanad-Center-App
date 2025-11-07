import BoxPopups from "../Components/Revenues/BoxPopups"
import Depts from "../Components/Revenues/Depts"
import Paybook from "../Components/Revenues/Paybook"
import RecordForm from "../Components/Revenues/RecordForms"
import RegisterCode from "../Components/Revenues/RegisterCode"
import RegisterOfReceivables from "../Components/Revenues/RegisterOfReceivables"
import RevenuesBoxes from "../Components/Revenues/RevenuesBoxes"
import TotalServing from "../Components/Revenues/TotalServing"


function Revenues() {
  return (
    <main className="w-full  flex flex-col gap-y-8 pb-2   ">

      <RevenuesBoxes />
      <BoxPopups />
      <Paybook />
      <RegisterCode />
      <Depts />
      <RegisterOfReceivables />
      <TotalServing />
      <RecordForm />



    </main>
  );
}

export default Revenues;



// { t("homeRev.totalLec") }