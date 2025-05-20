import React from 'react';
import { DownloadIcon, FileTextIcon, BarChartIcon, PieChartIcon, LineChartIcon } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
interface ReportType {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  lastGenerated?: string;
}
const reportTypes: ReportType[] = [{
  id: 1,
  title: "Rapport d'effectifs",
  description: 'Analyse détaillée des effectifs par département, ancienneté et statut.',
  icon: <BarChartIcon size={24} className="text-blue-500" />,
  lastGenerated: '15/07/2023'
}, {
  id: 2,
  title: 'Analyse des absences',
  description: 'Répartition des absences par type, durée et département.',
  icon: <PieChartIcon size={24} className="text-green-500" />,
  lastGenerated: '02/08/2023'
}, {
  id: 3,
  title: 'Suivi des performances',
  description: 'Évolution des scores de performance et atteinte des objectifs.',
  icon: <LineChartIcon size={24} className="text-purple-500" />,
  lastGenerated: '10/08/2023'
}, {
  id: 4,
  title: 'Turnover et recrutement',
  description: 'Analyse du turnover, des recrutements et des départs.',
  icon: <BarChartIcon size={24} className="text-red-500" />
}, {
  id: 5,
  title: 'Budget RH',
  description: 'Analyse des coûts salariaux et budget RH par département.',
  icon: <PieChartIcon size={24} className="text-yellow-500" />,
  lastGenerated: '28/07/2023'
}, {
  id: 6,
  title: 'Formation et développement',
  description: 'Suivi des formations, compétences et développement professionnel.',
  icon: <LineChartIcon size={24} className="text-indigo-500" />
}];
const Reports: React.FC = () => {
  return <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Rapports et analyses
        </h1>
        <p className="text-gray-500">Générez et consultez les rapports RH</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportTypes.map(report => <Card key={report.id} className="h-full">
            <div className="flex items-start">
              <div className="p-3 rounded-lg bg-gray-50">{report.icon}</div>
              <div className="ml-4">
                <h3 className="font-medium text-gray-800">{report.title}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {report.description}
                </p>
                {report.lastGenerated ? <p className="text-xs text-gray-400 mt-2">
                    Dernière génération: {report.lastGenerated}
                  </p> : <p className="text-xs text-gray-400 mt-2">Jamais généré</p>}
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
              <Button variant="primary" size="sm">
                Générer
              </Button>
              {report.lastGenerated && <Button variant="secondary" size="sm" icon={<DownloadIcon size={16} />}>
                  Télécharger
                </Button>}
            </div>
          </Card>)}
      </div>
      <Card title="Rapports personnalisés">
        <div className="text-center py-12">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <FileTextIcon size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-800">
            Créer un rapport personnalisé
          </h3>
          <p className="text-gray-500 mt-2 mb-6 max-w-md mx-auto">
            Sélectionnez les métriques, filtres et visualisations pour créer un
            rapport adapté à vos besoins.
          </p>
          <Button variant="primary">Nouveau rapport personnalisé</Button>
        </div>
      </Card>
    </div>;
};
export default Reports;