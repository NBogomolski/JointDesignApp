import { useEffect, useState , useRef} from 'react'
import Cookies from 'js-cookie'
import '../styles/Home.sass'
import { useNavigate, useParams } from 'react-router-dom'
import ProjectTile from './ProjectTile'
import axios from 'axios'


const Home = () => {
    const roomNameRef = useRef()
    const navigate = useNavigate()
    const params = useParams()
    const [showModal, setShowModal] = useState(false)
    const [projects, setProjects] = useState([])

    useEffect(() => {
        if (!Cookies.get('token')) {
            navigate('/auth/login', {replace: true})
        }
        axios.get(`http://localhost:5000/projects/${params.username}`, {
            headers: {
                'Authorization': Cookies.get('token'),
            }
        })
        .then((res) => {
            if (res.status === 200) {
                // setProjects(res.data)
                console.log(res.data)
                setProjects(res.data)
            }
        });
    }, [])

    return (
        <div className="container home">
            {showModal && (
                <div className="modal-container">
                    <div className="modal">
                        <input ref={roomNameRef} required placeholder='Room name' type="text" id="roomName" />
                        <button onClick={() => {
                            console.log(roomNameRef)
                            if (roomNameRef.current.value != '') {
                                setShowModal(false)
                                navigate('/rooms/', {replace: true})
                            } else {
                                roomNameRef.current.setCustomValidity('Fill out this field')
                                roomNameRef.current.reportValidity()
                                return
                            }
                        }}>Create</button>
                    </div>
                </div>
            )}
            <div className="header">
                <h1>Collaborative drawing app</h1>
                <h2 className="dashboard-title">{`${params.username}'s dashboard`}</h2>
                <button onClick={() => setShowModal(true)}>Create a new room</button>
            </div>
            <div className="dashboard">
                {projects.map((item) => {
                    return (
                        <ProjectTile key={item} props={item}/>
                    )
                })}
            </div>
        </div>
    );
}

export default Home