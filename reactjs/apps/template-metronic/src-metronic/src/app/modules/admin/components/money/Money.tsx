import React from 'react'

import {KTCard} from "../../../../../_metronic/helpers";
import MoneyProvider from "./MoneyContext";
import MoneyHeader from "./MoneyHeader";
import MoneyTable from "./MoneyTable";

const MoneyPage: React.FC = () => {
    return (
        <MoneyProvider>
            <KTCard>
                <MoneyHeader />
                <MoneyTable />
            </KTCard>
        </MoneyProvider>
    )
}

export default MoneyPage
