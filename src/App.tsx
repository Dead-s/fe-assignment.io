import { useEffect, useState } from 'react'
import './App.css'
import Content from './components/content';

function App() {
  const [content, setContent] = useState<string>('');
  const [listdata, setListdata] = useState([]);
  const [edit, setEdit] = useState<boolean>(false);
  const [confirm, setconfirm] = useState(false)
  const [userid, setUserid] = useState('')

  useEffect(() => {
    console.log(listdata)
    fetch("https://raw.githubusercontent.com/Dead-s/fe-assignment.io/main/src/data/celebrities.json")
      .then(res => res.json())
      .then((data) => {
        setListdata(data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // function search_user(value: React.FormEvent<HTMLInputElement>) {
  //   listdata.filter(data => {
  //     if (value.target.value == data['first'].toLowerCase() || value.target.value == data['last'].toLowerCase()) {
  //       setListdata(data)
  //     }
  //   })
  // }

  function delete_user(id: string) {
    setUserid(id);
  }

  function confirm_delete(id: string) {
    setListdata((crntlist) => {
      return crntlist.filter((item) => {
        if (item['id'] !== id) {
          return item
        }
      });
    })
    setUserid('')
    setconfirm(false)
  }

  return (
    <>
      <div className={`confirm-box ${confirm ? 'confirm-box-show' : ''}`}>
        <div className='confirm-box-child'>
          <h3>Delete dialog box</h3>
        </div>
        <div className='confirm-box-child'>
          <div className="box-gchild">
            <label>Are you sure want to delete?</label>
            <i className="fa-solid fa-xmark dialog-close" onClick={() => { setconfirm(false) }}></i>
          </div>
          <div className="box-gchild">
            <button onClick={() => { setconfirm(false) }}>Cancel</button>
            <button onClick={() => { confirm_delete(userid) }}>Delete</button>
          </div>
        </div>
      </div>
      <h1>Listview</h1>
      <div className='div-search'>
        <input type='search' placeholder='Search user' />
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
      <div className='container' >
        {listdata.length != 0 ?
          listdata.map(data => {
            return (
              <Content data={data} changeState={setContent} deleteUser={delete_user} confirm_state={setconfirm}
                stateVal={content} main_edit={edit} setMain_edit={setEdit} key={data['id']} />
            );
          })
          :
          <p>Loading ...</p>
        }
      </div>
    </>
  )
}

export default App
