import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'

const VaccinationConverage = props => {
  const {details} = props
  const data = details
  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <div>
      <BarChart data={data} width={1000} height={300}>
        <XAxis
          dataKey="vaccineDate"
          tick={{
            stroke: 'gray',
            strokeWidth: 1,
          }}
        />
        <YAxis
          tickFormatter={DataFormatter}
          tick={{
            stroke: 'gray',
            strokeWidth: 0,
          }}
        />
        <Legend
          wrapperStyle={{
            padding: 20,
          }}
        />
        <Bar
          dataKey="dose1"
          name="dose_1"
          fill="#2d87bb"
          barSize="20%"
          borderRadius="50%"
        />
        <Bar dataKey="dose2" name="dose_2" fill="#f54394" barSize="20%" />
      </BarChart>
    </div>
  )
}

export default VaccinationConverage
