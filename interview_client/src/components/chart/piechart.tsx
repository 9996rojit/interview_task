
import { PieChart, Pie, Tooltip } from 'recharts';

const data01 = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
 
];


const CreatePieChart = ()=>{
    return (
      
        <PieChart width={300} height={300}>
          <Pie
            dataKey="value"
            isAnimationActive={true}
            data={data01}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label={true}
          />
         
          <Tooltip />
        </PieChart>

    );
  }

  export default CreatePieChart