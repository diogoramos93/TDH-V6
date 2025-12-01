import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { ScoreResult } from '../types';

// Register standard fonts
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/helveticaneue/v1/HelveticaNeue-Regular.ttf' },
    { src: 'https://fonts.gstatic.com/s/helveticaneue/v1/HelveticaNeue-Bold.ttf', fontWeight: 'bold' }
  ]
});

const styles = StyleSheet.create({
  page: { flexDirection: 'column', backgroundColor: '#ffffff', padding: 40, fontFamily: 'Helvetica' },
  header: { marginBottom: 30, borderBottomWidth: 2, borderBottomColor: '#f0f0f0', paddingBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1e293b', marginBottom: 8 },
  subtitle: { fontSize: 12, color: '#64748b' },
  scoreSection: { backgroundColor: '#f8fafc', padding: 20, borderRadius: 8, marginBottom: 30 },
  scoreLabel: { fontSize: 10, color: '#64748b', textTransform: 'uppercase', marginBottom: 5 },
  scoreValue: { fontSize: 36, fontWeight: 'bold', color: '#0f172a' },
  categoryBadge: { fontSize: 14, fontWeight: 'bold', color: '#ffffff', backgroundColor: '#2563eb', padding: '6 12', borderRadius: 4, alignSelf: 'flex-start', marginTop: 10 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#1e293b', marginTop: 20, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: '#2563eb', paddingLeft: 10 },
  text: { fontSize: 12, lineHeight: 1.5, color: '#334155', marginBottom: 10, textAlign: 'justify' },
  chartRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  chartLabel: { width: 120, fontSize: 10, color: '#475569' },
  chartBarContainer: { flex: 1, height: 10, backgroundColor: '#e2e8f0', borderRadius: 5, marginRight: 10 },
  chartValue: { width: 30, fontSize: 10, fontWeight: 'bold', color: '#1e293b' },
  footer: { position: 'absolute', bottom: 30, left: 40, right: 40, borderTopWidth: 1, borderTopColor: '#e2e8f0', paddingTop: 20, flexDirection: 'row', justifyContent: 'space-between' },
  footerText: { fontSize: 8, color: '#94a3b8' }
});

interface PDFProps {
  data: ScoreResult;
  date: string;
}

export const PDFDocument = ({ data, date }: PDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Relatório de Avaliação TDAH</Text>
        <Text style={styles.subtitle}>FocusCheck - Avaliação Indicativa para Adultos</Text>
      </View>

      {/* Score */}
      <View style={styles.scoreSection}>
        <Text style={styles.scoreLabel}>Pontuação Total</Text>
        <Text style={styles.scoreValue}>{data.totalScore} / 192</Text>
        <Text style={{...styles.categoryBadge, backgroundColor: data.category === 'Baixa' ? '#22c55e' : data.category === 'Moderada' ? '#eab308' : '#ef4444' }}>
          {data.categoryText.toUpperCase()}
        </Text>
      </View>

      {/* Intro */}
      <View>
        <Text style={styles.sectionTitle}>Interpretação do Resultado</Text>
        <Text style={styles.text}>
          O resultado obtido ({data.category}) sugere padrões comportamentais compatíveis com a classificação. 
          {data.category === 'Alta' || data.category === 'Muito Alta' 
            ? ' É altamente recomendável buscar uma avaliação profissional com um neurologista ou psiquiatra especializado.'
            : ' Seus sintomas parecem estar dentro de uma faixa de controle, mas fique atento a mudanças em sua rotina.'}
        </Text>
      </View>

      {/* Breakdown */}
      <View>
        <Text style={styles.sectionTitle}>Análise por Área</Text>
        {data.sectionScores.map((section) => (
          <View key={section.name} style={styles.chartRow}>
            <Text style={styles.chartLabel}>{section.name}</Text>
            <View style={styles.chartBarContainer}>
               <View style={{ width: `${(section.score / section.max) * 100}%`, height: '100%', backgroundColor: '#3b82f6', borderRadius: 5 }} />
            </View>
            <Text style={styles.chartValue}>{section.score}/{section.max}</Text>
          </View>
        ))}
      </View>

      {/* Recommendations */}
      <View wrap={false}>
        <Text style={styles.sectionTitle}>Recomendações Práticas</Text>
        <Text style={styles.text}>
          1. Avaliação Profissional: Este documento não é um diagnóstico. Leve-o ao seu médico como material de apoio.
        </Text>
        <Text style={styles.text}>
          2. Rotina e Estrutura: Pessoas com este perfil beneficiam-se de rotinas externas rígidas. Use agendas físicas.
        </Text>
        <Text style={styles.text}>
          3. Sono e Exercício: A regulação de dopamina é fortemente influenciada pela qualidade do sono e atividade aeróbica.
        </Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Gerado em {date}</Text>
        <Text style={styles.footerText}>FocusCheck © 2024</Text>
      </View>
    </Page>
  </Document>
);