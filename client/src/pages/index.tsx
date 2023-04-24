import Page from '@/components/Page';
import Navbar from '@/components/navbar/navbar';
import { TUser } from '@/types/User';
import useSWR from 'swr';

function tableMaker(data: TUser[]){
	return (
		<table className="table table-zebra table-compact w-full my-4">
			<thead>
				<tr>
					<th>Name</th>
					<th>Email</th>
					<th>Gender</th>
					<th>Income</th>
					<th>City</th>
					<th>Car</th>
					<th>Quote</th>
					<th>Phone Price</th>
				</tr>
			</thead>
			<tbody>
				{data.map((user) => (
					<tr key={user.id}>
						<td>{user.first_name}</td>
						<td>{user.email}</td>
						<td>{user.gender}</td>
						<td>{user.income}</td>
						<td>{user.city}</td>
						<td>{user.car}</td>
						<td>{user.quote}</td>
						<td>{user.phone_price}</td>
					</tr>
				))}
				</tbody>
		</table>
	);
}

export default function Home() {
	const {
		data: data1,
		isLoading: isLoading1,
		error: error1,
	} = useSWR('/api/query/0', async () => {
		const res = await fetch('/api/query/0');
		return res.json();
	});
	const {
		data: data2,
		isLoading: isLoading2,
		error: error2,
	} = useSWR('/api/query/0', async () => {
		const res = await fetch('/api/query/1');
		return res.json();
	});
	const {
		data: data3,
		isLoading: isLoading3,
		error: error3,
	} = useSWR('/api/query/0', async () => {
		const res = await fetch('/api/query/2');
		return res.json();
	});
	const {
		data: data4,
		isLoading: isLoading4,
		error: error4,
	} = useSWR('/api/query/0', async () => {
		const res = await fetch('/api/query/3');
		return res.json();
	});
	const {
		data: data5,
		isLoading: isLoading5,
		error: error5,
	} = useSWR('/api/query/0', async () => {
		const res = await fetch('/api/query/4');
		return res.json();
	});
	return (
		<Page title="Api Filter">
			<Navbar/>
			{isLoading1 && <div>Loading...</div>}
			{error1 && <div>Error</div>}
			{data1 && tableMaker(data1)}
			{isLoading2 && <div>Loading...</div>}
			{error2 && <div>Error</div>}
			{data2 && tableMaker(data2)}
			{isLoading3 && <div>Loading...</div>}
			{error3 && <div>Error</div>}
			{data3 && tableMaker(data3)}
			{isLoading4 && <div>Loading...</div>}
			{error4 && <div>Error</div>}
			{data4 && tableMaker(data4)}
			{isLoading5 && <div>Loading...</div>}
			{error5 && <div>Error</div>}
			{data5 && tableMaker(data5)}
		</Page>
	);
}
