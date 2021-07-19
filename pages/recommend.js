import React from 'react';
import {
	useAuthUser,
	withAuthUser,
	withAuthUserTokenSSR,
} from 'next-firebase-auth';
import Header from '../components/Header';

const Recommend = () => {
	const AuthUser = useAuthUser();
	const message = 'This is the page for adding recommendations!';

	return (
		<div>
			<Header email={AuthUser.email} signOut={AuthUser.signOut} />
			<span>{message}</span>
		</div>
	);
};

export const getServerSideProps = withAuthUserTokenSSR()();

export default withAuthUser()(Recommend);
