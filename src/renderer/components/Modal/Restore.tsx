import classNames from 'classnames';
import { settings } from '../../lib/settings';
import { defaultSettings } from '../../../defaultSettings';
import { ipcRenderer } from '../../lib/utils';
import { getLang, loadLang } from '../../lib/loaders';

export default function RestoreModal({
    title,
    isOpen,
    onClose,
    setTheme,
    setSystemTray,
    setLang
}: {
    title: string;
    isOpen: boolean;
    onClose: any;
    setTheme: any;
    setSystemTray: any;
    setLang: any;
}) {
    if (!isOpen) return null;

    const appLang = getLang();

    const onSaveModal = async () => {
        // in this page
        setTheme(defaultSettings.theme);
        setSystemTray(defaultSettings.systemTray);
        setLang(defaultSettings.lang);
        // TODO Promise.all
        await settings.set('theme', defaultSettings.theme);
        await settings.set('systemTray', defaultSettings.systemTray);
        await settings.set('lang', defaultSettings.lang);
        document.documentElement.setAttribute('data-bs-theme', defaultSettings.theme);
        onClose();
        // other settings
        //await settings.set('scan', defaultSettings.scan);
        await settings.set('endpoint', defaultSettings.endpoint);
        //await settings.set('psiphon', defaultSettings.psiphon);
        await settings.set('location', defaultSettings.location);
        await settings.set('license', defaultSettings.license);
        //await settings.set('gool', defaultSettings.gool);
        await settings.set('method', defaultSettings.method);
        await settings.set('hostIP', defaultSettings.hostIP);
        await settings.set('ipType', defaultSettings.ipType);
        await settings.set('rtt', defaultSettings.rtt);
        await settings.set('ipData', defaultSettings.ipData);
        await settings.set('port', defaultSettings.port);
        await settings.set('proxyMode', defaultSettings.proxyMode);
        await settings.set('shareVPN', defaultSettings.shareVPN);
        //
        ipcRenderer.sendMessage('wp-end');
    };

    return (
        <>
            <div className='dialog'>
                <div className='dialogBg' onClick={onClose} />
                <div className='dialogBox'>
                    <div className='container'>
                        <div className='line'>
                            <div className='miniLine' />
                        </div>
                        <h3>{title}</h3>
                        <p>{appLang?.modal?.restore_desc}</p>
                        <div className='clearfix' />
                        <div className={classNames('btn', 'btn-cancel')} onClick={onClose}>
                            {appLang?.modal?.cancel}
                        </div>
                        <div
                            className={classNames('btn', 'btn-save')}
                            onClick={() => {
                                onSaveModal();
                            }}
                        >
                            {appLang?.modal?.confirm}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
