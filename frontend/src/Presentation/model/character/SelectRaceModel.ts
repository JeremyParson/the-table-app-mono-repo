import { useEffect, useState } from "react";

export default function SelectRaceModel () {
    const [races, setRaces] = useState([])
    const [selectedRace, setSelectedRace] = useState({
        name: '',
        speed: '',
        age: '',
        size: '',
        size_description: '',
        alignment: ''

    })
    const [selected, setSelected] = useState('')
    const [detail, setDetail] = useState(false)

    useEffect(() => {
        if (!races.length) getRaces();
        if (selected.length) detailRace(selected)
    }, [selected])

    async function getRaces () {
        const response = await fetch('https://www.dnd5eapi.co/api/races');
        const { results } = await response.json();
        setRaces(results)
    }

    async function detailRace (race:string) {
        const response = await fetch(`https://www.dnd5eapi.co/api/races/${race.toLowerCase()}`);
        const json = await response.json();
        setSelectedRace(json)
        setDetail(true)
    }

    return {races, selected, detail, setDetail, setSelected, selectedRace};
}