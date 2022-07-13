import { useEffect, useState } from "react";

export default function SelectRaceModel () {
    const [classes, setClasses] = useState([])
    const [selectedClass, setSelectedClass] = useState({
        name: '',
        hit_die: 0,
        proficiencies: [],
        proficiency_choices: [],
        starting_equipment: '',
        spellcasting: {},
        saving_throws: {},
    })

    const [proficiencies, setProficiencies] = useState([])
    const [selectedProficiencies, setSelectedProficiencies]: any = useState({
    })

    const [selected, setSelected] = useState('')
    const [detail, setDetail] = useState(false)

    useEffect(() => {
        if (!classes.length) getRaces();
        if (selected.length) detailClass(selected)
    }, [selected])
    

    useEffect(() => {
        let temp = []
        for (let key in selectedProficiencies) {
            let arr: any = selectedProficiencies[key]
            temp.push(...arr)
        }
        setProficiencies(temp)
        console.log(temp)
    }, [selectedProficiencies])

    async function getRaces () {
        const response = await fetch('https://www.dnd5eapi.co/api/classes');
        const { results } = await response.json();
        setClasses(results)
    }

    async function detailClass (race:string) {
        const response = await fetch(`https://www.dnd5eapi.co/api/classes/${race.toLowerCase()}`);
        const json = await response.json();
        console.log(json)
        setSelectedClass(json)
        setDetail(true)
    }

    function handleProficiencySelect (key: number, proficiencies: Array<string>) {
        setSelectedProficiencies({...selectedProficiencies, [key]: proficiencies})
    }

    return {classes, selected, detail, setDetail, setSelected, selectedClass, handleProficiencySelect, selected_proficiencies: proficiencies};
}