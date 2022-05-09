import React from "react";
import { KTCard } from "../../../../../_metronic/helpers";
import ExaminationProvider from "./ExaminationContext";
import ExaminationHeader from "./header/ExaminationHeader";
import ExaminationTable from "./ExaminationTable";

const ExaminationPage : React.FC = () => {
    return (
      <ExaminationProvider>
        <KTCard>
            <ExaminationHeader/>
            <ExaminationTable/>
        </KTCard>
      </ExaminationProvider>
    )
}

export default ExaminationPage