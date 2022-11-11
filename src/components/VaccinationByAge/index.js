import {PieChart, Pie, Legend, Cell} from 'recharts'
import './index.css'

const VaccinationByAge = props => {
  const {details} = props
  const data = details
  const settings = {
    width: 300,
    height: 300,
  }

  return (
    <div className="margin">
      <PieChart {...settings}>
        <Pie
          cx="50%"
          cy="30%"
          data={data}
          startAngle={0}
          endAngle={360}
          innerRadius="40%"
          outerRadius="70%"
          dataKey="count"
        >
          <Cell name="18-44" fill="#f54394" />
          <Cell name="44-60" fill="#5a8dee" />
          <Cell name="Above 60" fill="#2cc6c6" />
        </Pie>
        <Legend
          iconType="circle"
          layout="vertical"
          verticalAlign="middle"
          align="right"
        />
      </PieChart>
    </div>
  )
}

export default VaccinationByAge
