import { useEffect, useState } from "react";

type Contentprops = {
    stateVal: string,
    data: never,
    main_edit: boolean,
    confirm_state: React.Dispatch<React.SetStateAction<boolean>>,
    setMain_edit: React.Dispatch<React.SetStateAction<boolean>>,
    changeState: React.Dispatch<React.SetStateAction<string>>,
    deleteUser: (id: string) => void
}

function Content(props: Contentprops) {
    const [edit, setEdit] = useState<boolean>(false);
    const [country, setCountry] = useState<string>('');
    const [age, setAge] = useState('');
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [gender, setGender] = useState('')
    const [isUpdated, setisUpdated] = useState<boolean>(false)
    const gender_list = ['male', 'female', 'transgender', 'rather not say', 'other'];
    useEffect(() => {
        setName(props.data['first'] + " " + props.data['last'])
        setCountry(props.data['country']);
        setAge(calculate_age(props.data['dob']) as never);
        setDesc(props.data['description'])
        setGender(props.data['gender'])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    function calculate_age(dob: Date) {
        const diff_ms = Date.now() - new Date(dob).getTime();
        const age_dt = new Date(diff_ms);
        return Math.abs(age_dt.getUTCFullYear() - 1970);
    }
    function toggle_view(id: string) {
        if (props.stateVal == '') {
            props.changeState(id)
        }
        if (props.main_edit == false) {
            console.log('if edit' + edit)
            props.changeState(id)
        }
        if (props.stateVal == id && edit == false) {
            props.changeState('')
        }
    }
    function edit_detail() {
        if (parseInt(age) >= 18) {
            edit ? setEdit(false) : setEdit(true);
            props.setMain_edit(true)
        }
    }
    function edit_name(value: string) {
        if ((/^[a-zA-Z\s]*$/).test(value)) {
            console.log("in " + value)
            setName(value)
        }
    }
    function save_update() {
        console.log(age === '')
        if (country == '' || age == '' || desc == '' || name == '') {
            console.log('null any')
        }
        else {
            edit ? setEdit(false) : setEdit(true)
            props.setMain_edit(false)
        }
    }
    function cancel_update() {
        edit ? setEdit(false) : setEdit(true);
        props.setMain_edit(false)
        setName(props.data['first'] + " " + props.data['last'])
        setCountry(props.data['country']);
        setAge(calculate_age(props.data['dob']) as never);
        setDesc(props.data['description'])
        setGender(props.data['gender'])
    }

    return (
        <div className="container-list">
            <div className="child" onClick={() => { toggle_view(props.data['id']) }}>
                <div className='user-details'>
                    <img src={props.data['picture']} />
                    <input type="text" id="name" value={name} onChange={(e) => { edit_name(e.target.value); setisUpdated(true) }}
                        readOnly={!edit} className={!edit ? 'border-hide' : ''} />
                </div>
                <i className="fa-solid fa-chevron-down"></i>
            </div>
            <div className={`content ${props.stateVal == props.data['id'] && 'content-visible'}`}>
                <div className="child">
                    <div className="gchild">
                        <span>Age</span>
                        <input type="number" value={age} onChange={(e) => {
                            setAge(e.target.value);
                            setisUpdated(true)
                        }} readOnly={!edit} className={!edit ? 'border-hide' : ''} />
                    </div>
                    <div className="gchild">
                        <span>Gender</span>
                        <label>
                            <select disabled={!edit} className={!edit ? 'border-hide' : ''} onChange={(e) => { setGender(e.target.value); setisUpdated(true) }}>
                                <optgroup>
                                    {gender_list.map(gendr => {
                                        return (<option key={gendr} selected={gendr == gender ? true : false}>{gendr}</option>)
                                    })}
                                </optgroup>
                            </select>
                        </label>
                    </div>
                    <div className="gchild">
                        <span>Country</span>
                        <input type="text" className={!edit ? 'border-hide' : ''} value={country} readOnly={!edit}
                            onChange={(e) => { setCountry(e.target.value); setisUpdated(true) }} />
                    </div>
                </div>
                <div className="child">
                    <div className="gchild">
                        <span>Description</span>
                        <textarea className={`desc ${!edit ? 'border-hide' : ''}`} onChange={() => { setisUpdated(true) }} readOnly={!edit} defaultValue={desc}></textarea>
                    </div>
                </div>
                <div className={`child edit  ${edit ? 'hide' : ''}`}>
                    <i className="fa-solid fa-trash-can" onClick={() => {
                        props.deleteUser(props.data['id']);
                        props.changeState('');
                        props.setMain_edit(true)
                        props.confirm_state(true)
                    }}></i>
                    <i className="fa-solid fa-pen" onClick={() => { edit_detail() }}></i>
                </div>
                <div className={`child save-div  ${edit ? '' : 'hide'}`}>
                    <i className={`fa-solid fa-check ${isUpdated ? '' : 'disable-icon'}`} onClick={() => { save_update() }}></i>
                    <i className="fa-solid fa-xmark" onClick={cancel_update}></i>
                </div>
            </div>
        </div >
    )
}

export default Content