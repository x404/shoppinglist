import { useTranslation } from 'react-i18next';
import { ButtonGroup, Button } from 'react-bootstrap';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const currentLang = i18n.language;

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <ButtonGroup size="sm" aria-label="Language switcher">
            <Button
                variant={currentLang === 'en' ? 'primary' : 'outline-primary'}
                onClick={() => changeLanguage('en')}
            >
                EN
            </Button>
            <Button
                variant={currentLang === 'ua' ? 'primary' : 'outline-primary'}
                onClick={() => changeLanguage('ua')}
            >
                UA
            </Button>
        </ButtonGroup>
    );
};

export default LanguageSwitcher;