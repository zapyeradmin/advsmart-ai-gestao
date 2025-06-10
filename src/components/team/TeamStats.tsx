
import React from 'react';

interface TeamMember {
  id: number;
  nome: string;
  cargo: string;
  status: string;
  casos: number;
}

interface TeamStatsProps {
  members: TeamMember[];
}

const TeamStats = ({ members }: TeamStatsProps) => {
  const totalMembers = members.length;
  const totalLawyers = members.filter(m => m.cargo.includes('Advogad')).length;
  const activeMembers = members.filter(m => m.status === 'Ativo').length;
  const totalCases = members.reduce((sum, m) => sum + m.casos, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-dark-card rounded-lg p-4 border border-gray-800">
        <div className="text-2xl font-bold text-white">{totalMembers}</div>
        <div className="text-gray-400 text-sm">Total da Equipe</div>
      </div>
      <div className="bg-dark-card rounded-lg p-4 border border-gray-800">
        <div className="text-2xl font-bold text-blue-400">{totalLawyers}</div>
        <div className="text-gray-400 text-sm">Advogados</div>
      </div>
      <div className="bg-dark-card rounded-lg p-4 border border-gray-800">
        <div className="text-2xl font-bold text-green-400">{activeMembers}</div>
        <div className="text-gray-400 text-sm">Ativos</div>
      </div>
      <div className="bg-dark-card rounded-lg p-4 border border-gray-800">
        <div className="text-2xl font-bold text-purple-400">{totalCases}</div>
        <div className="text-gray-400 text-sm">Casos Ativos</div>
      </div>
    </div>
  );
};

export default TeamStats;
