import React, {useEffect, useState} from "react";
import {AutoComplete} from "antd";
import axios from "axios";


export default function SearchField({setAttendance, setMemberLoading, unSetMemberLoading}) {
    const [options, setOptions] = useState([])
    const [value, setValue] = useState('');
    useEffect(() => {
    }, [])
    const handleSearch = async (value) => {
        try {
            const response = await axios.get('getMembers?search=' + value)
            const members = response.data.members
            const a = members.map(member => {
                return {
                    label: member.name,
                    value: member.name,
                    id: member.id
                }
            })
            setOptions(a)
        } catch (e) {

        } finally {

        }
    }
    const onSelect = async (value, option) => {
        try {
            setMemberLoading()
            const id = option.id
            const response = await axios.get('getAttendance/' + id)
            setAttendance(response.data)
        } catch (e) {

        } finally {
            unSetMemberLoading()
        }

    }
    const onChange = (data) => {
        setValue(data);
    };
    return (
        <div className="search-field">
            <AutoComplete
                style={{
                    width: 250,

                }}
                filterOption={(inputValue, option) =>
                    option.label.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
                onSelect={(val, option) => onSelect(val, option)}
                onSearch={handleSearch}
                onChange={onChange}
                placeholder="Enter Your Name"
                options={options}
                showSearch={true}
            />
        </div>
    );
}
