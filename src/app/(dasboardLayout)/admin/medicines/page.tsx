import ManageMedicine from '@/components/pages/admin/madicine';
import { getAllMedicines } from '@/services/Medicines';
import React from 'react';

const MedicinePage = async() => {
    const {data} = await getAllMedicines();
    console.log(data);
    return (
        <div>
            <ManageMedicine medicines={data}/>
        </div>
    );
};

export default MedicinePage;