import { useEffect, useState } from 'react';
import '../dashboard/dashboard.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Dashboard = () => {
    const navigate = useNavigate();
    const [userList, setUserList] = useState([]);
	const [currentPage, setCurrentPage] = useState(1)
	const recordsPerpage = 5
	const lastIndex = currentPage * recordsPerpage;
	const firstIndex = lastIndex-recordsPerpage;
	const records = userList.slice(firstIndex,lastIndex)

	const nPage = Math.ceil(userList.length / recordsPerpage)
	const numbers = [...Array(nPage +1).keys()].slice(1)


	const nextPage = ()=>{
		if(currentPage !== nPage){
			setCurrentPage(currentPage +1)
		}

	}
	const prePage = ()=>{
		if(currentPage !== 1){
			setCurrentPage(currentPage -1)
		}

	}

	const changeCPage = (id)=>{
		setCurrentPage(id)


	}

    const goToEditPage = (userId) => {
        localStorage.setItem("id", userId);
        navigate("/edit");
    };

    const deleteUser = async (deleteId) => {
        const confirmed = window.confirm("Are you sure you want to delete this user?");
        if (!confirmed) return;

        try {
            const res = await axios.delete(`https://nodecompcrudwithauth.onrender.com/api/userdelete/${deleteId}`);
            alert("User deleted successfully");
		
			fetchUser()
            console.log(res);
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const fetchUser = async () => {
        try {
            const res = await axios.get("https://nodecompcrudwithauth.onrender.com/api/getuser");
            setUserList(res.data.data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <>
            <div className="user">
                <h1>Our Valuable Users here...</h1>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Sn.</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((user, index) => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.phone}</td>
                            <td>{user.email}</td>
                            <td>
                                <button onClick={() => goToEditPage(user._id)} type="button" className="btn btn-primary">Edit</button>
                                <button onClick={() => deleteUser(user._id)} type="button" className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

			<nav className='mt-5 hari'>
    <ul className='pagination'>
        <li className='page-item'>
            <a href="#!" className='page-link' onClick={prePage}>Prev</a>
        </li>
        {
            numbers.map((n, i) => (
                <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                    <a href="#!" className='page-link' onClick={() => changeCPage(n)}>{n}</a>
                </li>
            ))
        }
        <li className='page-item'>
            <a href="#!" className='page-link' onClick={nextPage}>Next</a>
        </li>
    </ul>
</nav>

        </>
    );
};

export default Dashboard;
