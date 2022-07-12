type Props = {
    character: Character
}

export default function CharacterCard (props: Props) {
    return <div className="border-2 border-solid border-black rounded-md p-1 h-fit">
        <h2 className="text-xl">{props.character.name}</h2>
        <h3>Stats</h3>
        <div className="grid grid-cols-3">
            <h4>STR {props.character.strength || '-'}</h4>
            <h4>DEX {props.character.dexterity || '-'}</h4>
            <h4>CON {props.character.constitution || '-'}</h4>
            <h4>WIS {props.character.wisdom || '-'}</h4>
            <h4>CHA {props.character.charisma || '-'}</h4>
            <h4>INT {props.character.intelligence || '-'}</h4>
        </div>
    </div>
}
