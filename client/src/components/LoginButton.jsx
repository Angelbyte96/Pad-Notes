import { Google } from '@/components/icons/Google'
import { Microsoft } from '@/components/icons/Microsoft'
const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_HOST

const LoginButton = ({ provider, className }) => {
	const handleLogin = () => {
		window.location.href = `${STRAPI_URL}/api/connect/${provider}`
	}

	const prov = provider.charAt(0).toUpperCase() + provider.slice(1)
	const iconsMap = { google: Google, microsoft: Microsoft }
	const icon = iconsMap[provider]

	return (
		<button onClick={handleLogin} className={className}>
			<span>{icon()}</span>
			<span>Continue with {prov}</span>
		</button>
	)
}

export { LoginButton }
