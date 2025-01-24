import { GlobalLoader } from './GlobalLoader'
import { Profile } from './profile/Profile'

export const DashboardHeader = () => {
	return (
		<header>
			<GlobalLoader />
			<Profile />
		</header>
	)
}
