import { ResponseProps } from '../../../core/types';
import ResponseBlock from '../../GET/responseBlock';
import '../../../../i18n';
import { useTranslation } from 'react-i18next';

const Response: React.FC<ResponseProps> = ({ response }) => {
  const { t } = useTranslation();

  return (
    <section className="graphiql-response">
      <h2>{t('response')}</h2>
      <ResponseBlock response={response} />
    </section>
  );
};

export default Response;
