// zustand/user.ts
import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { useRouter } from 'next/router';
import { ElLoading, ElMessage } from 'element-plus';
import cookie from 'js-cookie';
import { watch } from 'fs';
import router from 'next/dist/shared/lib/router/router';
import type { userInfo } from 'os';

export interface UserState {
	userInfo: {
		uuid: string;
		nickName: string;
		headerImg: string;
		authority: Record<string, any>;
		sideMode: 'dark' | 'light';
		baseColor: string;
	};
	token: string;
	loadingInstance: null | ReturnType<typeof ElLoading.service>;
	setUserInfo: (val: typeof userInfo) => void;
	setToken: (val: string) => void;
	NeedInit: () => void;
	ResetUserInfo: (value?: Partial<typeof userInfo>) => void;
	GetUserInfo: () => Promise<any>;
	LoginIn: (loginInfo: any) => Promise<boolean>;
	LoginOut: () => Promise<void>;
	ClearStorage: () => Promise<void>;
	changeSideMode: (data: 'dark' | 'light') => Promise<void>;
	mode: ComputedRef<'dark' | 'light'>;
	sideMode: ComputedRef<string>;
	baseColor: ComputedRef<string>;
}

const useUserStore = create<UserState>((set) => {
	const loadingInstance = ref<typeof ElLoading.service | null>(null);

	const userInfo = ref<UserState['userInfo']>({
		uuid: '',
		nickName: '',
		headerImg: '',
		authority: {},
		sideMode: 'dark',
		baseColor: '#fff'
	});
	const token = ref<string>('');

	const setUserInfo = (val: UserState['userInfo']) => {
		userInfo.value = val;
	};

	const setToken = (val: string) => {
		token.value = val;
		cookie.set('x-token', val, { expires: 7 }); // 设置 token 过期时间为 7 天
	};

	const NeedInit = () => {
		token.value = '';
		cookie.remove('x-token');
		router.push({ name: 'Init', replace: true });
	};

	const ResetUserInfo = (value?: Partial<UserState['userInfo']>) => {
		userInfo.value = { ...userInfo.value, ...value };
	};

	const GetUserInfo = async () => {
		const res = await getUserInfo();
		if (res.code === 0) {
			setUserInfo(res.data.userInfo);
		}
		return res;
	};

	const LoginIn = async (loginInfo: any) => {
		loadingInstance.value = ElLoading.service({
			fullscreen: true,
			text: '登录中，请稍候...',
		});

		const res = await login(loginInfo);

		// 登录失败，直接返回
		if (res.code !== 0) {
			loadingInstance.value?.close();
			return false;
		}

		// 登录成功，设置用户信息和权限相关信息
		setUserInfo(res.data.user);
		setToken(res.data.token);

		// 初始化路由信息
		const routerStore = useRouter();
		await routerStore.setAsyncRoutes(res.data.user.authority.routes);
		const asyncRouters = routerStore.getAsyncRout
		// 注册到路由表里
		routerStore.getAsyncRoutes().forEach(asyncRouter => {
			router.push(asyncRouter);
		});

		if (!router.pathname.startsWith(userInfo.value.authority.defaultRouter)) {
			ElMessage.error('请联系管理员进行授权');
		} else {
			router.push({ name: userInfo.value.authority.defaultRouter });
		}

		const isWin = ref(/windows/i.test(navigator.userAgent));
		if (isWin.value) {
			cookie.set('osType', 'WIN');
		} else {
			cookie.set('osType', 'MAC');
		}

		// 全部操作均结束，关闭loading并返回
		loadingInstance.value?.close();
		return true;
	};

	const LoginOut = async () => {
		const res = await jsonInBlacklist();

		// 登出失败
		if (res.code !== 0) {
			return;
		}

		await ClearStorage();

		// 把路由定向到登录页，无需等待直接reload
		router.push({ name: 'Login', replace: true });
		window.location.reload();
	};

	const ClearStorage = async () => {
		token.value = '';
		cookie.remove('x-token');
		cookie.remove('osType');
	};

	const changeSideMode = async (data: 'dark' | 'light') => {
		const res = await setSelfInfo({ sideMode: data });
		if (res.code === 0) {
			userInfo.value.sideMode = data;
			ElMessage({
				type: 'success',
				message: '设置成功'
			});
		}
	};

	const mode = computed(() => userInfo.value.sideMode);
	const sideMode = computed(() => {
		if (userInfo.value.sideMode === 'dark') {
			return '#191a23';
		} else if (userInfo.value.sideMode === 'light') {
			return '#fff';
		} else {
			return userInfo.value.baseColor;
		}
	});
	const baseColor = computed(() => {
		if (userInfo.value.sideMode === 'dark') {
			return '#fff';
		} else if (userInfo.value.sideMode === 'light') {
			return '#191a23';
		} else {
			return userInfo.value.baseColor;
		}
	});

	watch(() => token.value, () => {
		cookie.set('x-token', token.value, { expires: 7 }); // 设置 token 过期时间为 7 天
	});

	return {
		userInfo,
		token,
		loadingInstance,
		setUserInfo,
		setToken,
		NeedInit,
		ResetUserInfo,
		GetUserInfo,
		LoginIn,
		LoginOut,
		ClearStorage,
		changeSideMode,
		mode,
		sideMode,
		baseColor,
	};
}, devtools());

export default useUserStore;
