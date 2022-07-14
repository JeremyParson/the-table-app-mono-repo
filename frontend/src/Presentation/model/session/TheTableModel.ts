import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Socket } from "socket.io-client";
import { detailCampaign } from "../../../Data/campaign/DataStore";

export default function TheTableModel (socket: Socket<any, any>) {
    const [campaign, setCampaign] = useState({})
    const {id} = useParams()

    useEffect(() => {
        getData();
    }, [])

    async function getData() {
        const data = await detailCampaign(id)
        setCampaign(data)
    }

    return {};
}