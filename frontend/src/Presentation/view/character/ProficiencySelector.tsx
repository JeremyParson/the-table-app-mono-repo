import { useEffect, useState } from "react";

type Props = {
  data: {
    choose: number;
    type: string;
    from: [
      {
        index: string;
        name: string;
        url: string;
      }
    ];
  },
  handleProficiencySelect: Function,
  index: number
};

// Take a proficiency from api and render a proficiency selector based off of input
export default function ProficiencySelector({ data, handleProficiencySelect, index }: Props) {
  const [values, setValues] = useState([])

  useEffect(() => {
    handleProficiencySelect(index, values)
  }, [values])

  // handle all changes
  function onChange(prop: string, value: any) {
    if (prop == 'proficiencies') {
      let proficiencies = [];
      for (let option of value) {
        if (!(option instanceof HTMLOptionElement)) continue
        if ( proficiencies.length < data.choose) {
          if (option.selected) proficiencies.push(option.value)
        } else {
          option.selected = false;
        }
      }
      console.log(proficiencies)
      return setValues(proficiencies)
    }
  }

  return (
    <div className="flex flex-col">
      <label>Select {data.choose}</label>
      <select name={data.type} multiple onChange={e => onChange(e.target.name, e.target.options)}>
        {data.from.map((choice, i) => (
          <option key={i} value={choice.index}>
            {choice.name}
          </option>
        ))}
      </select>
    </div>
  );
}
