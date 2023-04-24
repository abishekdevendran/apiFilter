import Page from '@/components/Page';
import Navbar from '@/components/navbar/navbar';
import { TCity } from '@/types/City';
import { TUser } from '@/types/User';
import useSWR from 'swr';

function cityTableMaker(data: TCity[], title?: string) {
	return (
		<div className="cityTableMaker w-full">
			<h2 className="w-full text-center text-xl font-semibold">{title}</h2>
			<div className="w-full overflow-x-auto">
				<table className="table table-zebra table-compact w-full my-4">
					<thead>
						<tr>
							<th></th>
							<th>City</th>
							<th>Count</th>
							<th>Average Income</th>
						</tr>
					</thead>
					<tbody>
						{data.map((city, idx) => (
							<tr key={city.name}>
								<td>{idx}</td>
								<td>{city.name}</td>
								<td>{city.count}</td>
								<td>{city.average_income}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
function tableMaker(data: TUser[], title?: string) {
	return (
		<div className="tableMaker w-full">
			{title && (
				<h2 className="w-full text-center text-xl font-semibold">{title}</h2>
			)}
			<div className="w-full overflow-x-auto">
				<table className="table table-zebra table-compact w-full my-4">
					<thead>
						<tr>
							<th></th>
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
						{data.map((user, idx) => (
							<tr key={user.id}>
								<td>{idx}</td>
								<td>{`${user.first_name} ${user.last_name}`}</td>
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
			</div>
		</div>
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
	} = useSWR('/api/query/1', async () => {
		const res = await fetch('/api/query/1');
		return res.json();
	});
	const {
		data: data3,
		isLoading: isLoading3,
		error: error3,
	} = useSWR('/api/query/2', async () => {
		const res = await fetch('/api/query/2');
		return res.json();
	});
	const {
		data: data4,
		isLoading: isLoading4,
		error: error4,
	} = useSWR('/api/query/3', async () => {
		const res = await fetch('/api/query/3');
		return res.json();
	});
	const {
		data: data5,
		isLoading: isLoading5,
		error: error5,
	} = useSWR('/api/query/4', async () => {
		const res = await fetch('/api/query/4');
		return res.json();
	});
	return (
		<Page title="Api Filter">
			<Navbar />
			{isLoading1 && <div>Loading...</div>}
			{error1 && <div>Error</div>}
			{data1 &&
				tableMaker(
					data1,
					'Users who have income lower than $5 USD and have a car of brand “BMW” or “Mercedes”'
				)}
			{isLoading2 && <div>Loading...</div>}
			{error2 && <div>Error</div>}
			{data2 &&
				tableMaker(
					data2,
					'Male Users who have phone price greater than 10,000'
				)}
			{isLoading3 && <div>Loading...</div>}
			{error3 && <div>Error</div>}
			{data3 &&
				tableMaker(
					data3,
					'Users whose last name starts with “M” and has a quote character length greater than 15 and email includes his/her last name'
				)}
			{isLoading4 && <div>Loading...</div>}
			{error4 && <div>Error</div>}
			{data4 &&
				tableMaker(
					data4,
					'Users which have a car of brand “BMW”, “Mercedes” or “Audi” and whose email does not include any digit'
				)}
			{isLoading5 && <div>Loading...</div>}
			{error5 && <div>Error</div>}
			{data5 &&
				cityTableMaker(
					data5,
					'Show the data of top 10 cities which have the highest number of users and their average income'
				)}
		</Page>
	);
}
