import Vue from 'vue';
import Router from 'vue-router';
import Meta from 'vue-meta';
import cookie from 'vue-cookie';

import gateway from '@idea/gateway';
import env, {Plugins} from '@front/helpers/env';

import appRoutes from './routes';

import ComponentsMindmap from '../components/Mindmap/ComponentsMindmap';

Vue.use(Router);
Vue.use(Meta);

const rConfig = {
	scrollBehavior() {
		window.scrollTo(0, 0);
	},
	routes: [
		...appRoutes
	]
};

if (!env.isPlugin(Plugins.idea)) {
	rConfig.mode = 'history';
	rConfig.routes.push(
		{
			path: '/',
			redirect() {
				window.location = new URL('/main', window.origin);
			}
		});
	rConfig.routes.push(
		{
			path: '/sso/gitlab/authentication',
			redirect(route) {
				const OAuthCode = Object.keys(route.query).length
					? route.query.code
					: new URLSearchParams(route.hash.substr(1)).get('code');
				if (OAuthCode) {
					window.Vuex.dispatch('onReceivedOAuthCode', OAuthCode);
					const rRoute = cookie.get('return-route');
					return rRoute ? JSON.parse(rRoute) : {
						path: '/main',
						query: {},
						hash: ''
					};
				} else {
					return {
						path: '/sso/error',
						query: {},
						hash: ''
					};
				}
			}
		}
	);
} else {
	rConfig.routes.push(
		{
			path: '/url=about:blank',
			component: ComponentsMindmap
		}
	);
}

const router = new Router(rConfig);

gateway.appendListener('navigate/component', (data) => {
	router.push({ path: `/architect/components/${Object.keys(data)[0]}`});
});

gateway.appendListener('navigate/document', (data) => {
	router.push({ path: `/docs/${Object.keys(data)[0]}`});
});

gateway.appendListener('navigate/aspect', (data) => {
	router.push({ path: `/architect/aspects/${Object.keys(data)[0]}`});
});

gateway.appendListener('navigate/context', (data) => {
	router.push({ path: `/architect/contexts/${Object.keys(data)[0]}`});
});

gateway.appendListener('navigate/devtool', (data) => {
	router.push({ path: `/devtool/${Object.keys(data)[0]}`});
});

export default router;
