import React from 'react';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Section from '@src/components/Section';
import PageContainer from '@src/components/PageContainer';
import GridDecoration from '@src/components/GridDecoration';

export default function AIDemoPage() {
  return (
    <Layout>
      <Head>
        <title>RainAgent 演示 - Rainbond</title>
        <meta name="description" content="RainAgent 智能助手对话流程演示" />
      </Head>
      <PageContainer>
        <Section style={{ position: 'relative' }}>
          <GridDecoration />
          <div style={{ width: '100%', padding: '4rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.5rem' }}>
            <div style={{ textAlign: 'center', maxWidth: 680 }}>
              <div style={{
                display: 'inline-block',
                padding: '4px 12px',
                background: 'rgba(110, 58, 217, 0.1)',
                border: '1px solid rgba(110, 58, 217, 0.3)',
                borderRadius: 16,
                fontSize: 12,
                color: '#6e3ad9',
                fontWeight: 500,
                marginBottom: '1.25rem',
              }}>
                RainAgent · 智能助手
              </div>
              <h1 style={{ fontSize: 44, fontWeight: 700, lineHeight: 1.2, marginBottom: '1rem' }}>
                让 AI 替你
                <span style={{
                  background: 'linear-gradient(135deg, #4f6bff 0%, #6e3ad9 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginLeft: 8,
                }}>
                  排查、部署、扩容
                </span>
              </h1>
              <p style={{ fontSize: 16, color: 'var(--text-secondary, #6c757d)', lineHeight: 1.7, margin: 0 }}>
                只用自然语言描述需求，RainAgent 会自动查状态、读日志、定位问题，并在你确认后执行操作。
              </p>
            </div>
            <BrowserOnly fallback={<div style={{ minHeight: 540 }} />}>
              {() => {
                const AIChatDemo = require('@src/components/AIChatDemo').default;
                return <AIChatDemo />;
              }}
            </BrowserOnly>
          </div>
        </Section>
      </PageContainer>
    </Layout>
  );
}
