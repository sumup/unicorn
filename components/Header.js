import React from 'react';
import Link from 'next/link';

// const nfaDependencyVersion =
// 	require('../package.json').dependencies['next-firebase-auth'];
// const nextDependencyVersion = require('../package.json').dependencies.next;

const styles = {
	container: {
		display: 'flex',
		justifyContent: 'flex-end',
		alignItems: 'center',
		padding: 16,
	},
	rainbow: {
		height: '2px',
		width: '100%',
		background:
			'linear-gradient(to right, #F9AD9D,#F6BA84,#F8C863,#F3E175,#E9E68A,#CFE6B0,#A1E09A,#72DAD3,#69C4EA,#5BBDEC,#8261D4,#E457A9)',
		margin: '0',
		padding: '0',
		border: 'none',
	},
	button: {
		marginLeft: 16,
		cursor: 'pointer',
	},
	unicorn: {
		color: '#A22BDA',
		fontWeight: '700',
		fontSize: 24,
		marginLeft: 0,
		marginRight: 'auto',
	},
};

const unicorn = '🦄 Unicorn';

const Header = ({ email, signOut }) => (
	<>
		<div style={styles.container}>
			<div style={styles.unicorn}>{unicorn}</div>
			{email ? (
				<>
					<p>Signed in as {email}</p>
					<button
						type='button'
						onClick={() => {
							signOut();
						}}
						style={styles.button}
					>
						Sign out
					</button>
				</>
			) : (
				<>
					<p>You are not signed in.</p>
					<Link href='/auth'>
						<a>
							<button type='button' style={styles.button}>
								Sign in
							</button>
						</a>
					</Link>
				</>
			)}
		</div>
		<hr style={styles.rainbow} />
	</>
);

export default Header;
