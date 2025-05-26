import { useTranslation } from 'react-i18next';
import { ButtonGroup, Button } from 'react-bootstrap';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const currentLang = i18n.language === 'uk' ? 'en' : i18n.language;

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <ButtonGroup size="sm" aria-label="Language switcher">
            <Button
                variant={currentLang === 'en' ? 'secondary' : 'outline-secondary'}
                onClick={() => changeLanguage('en')}
            >
                EN
            </Button>
            <Button
                variant={currentLang === 'ua' ? 'secondary' : 'outline-secondary'}
                onClick={() => changeLanguage('ua')}
            >
                UA
            </Button>
        </ButtonGroup>
    );
};

export default LanguageSwitcher;