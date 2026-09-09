'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './Mobile.module.css'
import projectsData from '@/data/projects.json'
import skillsData from '@/data/skills.json'
import experienceData from '@/data/experience.json'
import certificationsData from '@/data/certifications.json'
import awardsData from '@/data/awards.json'

export default function MobileHome() {
  const [mounted, setMounted] = useState(false)
  const projectCount = projectsData.length

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className={styles.page}>
      <section className={styles.hero} id="about">
        <div className={styles.heroAvatar} aria-hidden={!mounted}>
          <Image
            src="/logo.png"
            alt="RANI"
            width={140}
            height={140}
            priority
          />
        </div>

        <div className={styles.heroBadge}>
          <span className={styles.heroBadgeDot} />
          Available for work
        </div>

        <h1 className={styles.heroTitle}>
          안녕하세요,<br />
          <span className={styles.heroHighlight}>RANI</span>입니다.
        </h1>

        <p className={styles.heroDescription}>
          사용자 경험을 중시하는 개발자입니다.
          깔끔하고 효율적인 코드로 의미 있는 서비스를 만들어갑니다.
        </p>

        <div className={styles.heroStats}>
          <div className={styles.heroStat}>
            <span className={styles.heroStatNumber}>3+</span>
            <span className={styles.heroStatLabel}>Years</span>
          </div>
          <span className={styles.heroStatDivider} />
          <div className={styles.heroStat}>
            <span className={styles.heroStatNumber}>{projectCount}+</span>
            <span className={styles.heroStatLabel}>Projects</span>
          </div>
          <span className={styles.heroStatDivider} />
          <div className={styles.heroStat}>
            <span className={styles.heroStatNumber}>10+</span>
            <span className={styles.heroStatLabel}>Clients</span>
          </div>
        </div>

        <div className={styles.heroActions}>
          <a href="#projects" className={styles.heroBtnPrimary}>
            View Projects
          </a>
          <a href="mailto:support@raniweb.kr" className={styles.heroBtnSecondary}>
            Contact
          </a>
        </div>
      </section>

      <MobileProjects />
      <MobileSkills />
      <MobileExperience />
      <MobileCertifications />
      <MobileAwards />
      <MobileFooter />
    </div>
  )
}

function MobileProjects() {
  const [selected, setSelected] = useState<typeof projectsData[0] | null>(null)

  return (
    <section className={styles.section} id="projects">
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>Portfolio</span>
        <h2 className={styles.sectionTitle}>Projects</h2>
      </div>

      <div className={styles.projectList}>
        {projectsData.map((project) => (
          <article key={project.id} className={styles.projectCard}>
            <div className={styles.projectTop}>
              <span className={styles.projectYear}>{project.year}</span>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.projectGit}
                  aria-label="GitHub"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </a>
              )}
            </div>
            <h3 className={styles.projectTitle}>{project.title}</h3>
            <p className={styles.projectDesc}>{project.description}</p>
            <div className={styles.projectTags}>
              {project.tags.map((tag) => (
                <span key={tag} className={styles.projectTag}>
                  {tag}
                </span>
              ))}
            </div>
            <button
              className={styles.projectDetail}
              onClick={() => setSelected(project)}
            >
              상세보기
            </button>
          </article>
        ))}
      </div>

      {selected && (
        <MobileProjectModal
          project={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  )
}

function MobileProjectModal({
  project,
  onClose,
}: {
  project: typeof projectsData[0]
  onClose: () => void
}) {
  // 모바일 전용 바텀시트 모달. 데스크탑 ProjectModal(마크다운/이미지/긴 본문)과
  // 목적이 다르므로 가벼운 인터랙션만 제공하는 인라인 모달로 구현.
  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.55)',
        zIndex: 200,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxHeight: '85vh',
          background: 'var(--bg-primary)',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          padding: 20,
          overflowY: 'auto',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, alignItems: 'center' }}>
          <strong style={{ fontSize: 16, color: 'var(--text-primary)' }}>{project.title}</strong>
          <button
            onClick={onClose}
            aria-label="닫기"
            style={{
              fontSize: 18,
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 8,
              color: 'var(--text-secondary)',
            }}
          >
            ✕
          </button>
        </div>
        <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: 16 }}>
          {project.description}
        </p>
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              padding: '12px',
              background: 'var(--text-primary)',
              color: 'var(--bg-primary)',
              borderRadius: 8,
              textAlign: 'center',
              fontWeight: 600,
              fontSize: 13,
            }}
          >
            사이트 방문하기
          </a>
        )}
      </div>
    </div>
  )
}

function MobileSkills() {
  return (
    <section className={`${styles.section} ${styles.sectionAlt}`} id="skills">
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>Expertise</span>
        <h2 className={styles.sectionTitle}>Skills & Tech Stack</h2>
      </div>

      <div className={styles.skillList}>
        {skillsData.map((cat) => (
          <div key={cat.title} className={styles.skillCategory}>
            <h3 className={styles.skillCategoryTitle}>{cat.title}</h3>
            <div className={styles.skillItems}>
              {cat.skills.map((skill) => (
                <span key={skill} className={styles.skillItem}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function MobileExperience() {
  return (
    <section className={styles.section} id="experience">
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>Career</span>
        <h2 className={styles.sectionTitle}>Work Experience</h2>
      </div>

      <div className={styles.expList}>
        {experienceData.map((exp) => (
          <div key={exp.id} className={styles.expItem}>
            <span className={styles.expPeriod}>{exp.period}</span>
            <h3 className={styles.expCompany}>{exp.company}</h3>
            <p className={styles.expRole}>
              {exp.role}
              {exp.description ? ` · ${exp.description}` : ''}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

function MobileCertifications() {
  return (
    <section className={`${styles.section} ${styles.sectionAlt}`} id="certifications">
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>Credentials</span>
        <h2 className={styles.sectionTitle}>Certifications</h2>
      </div>

      <div className={styles.certList}>
        {certificationsData.map((cert) => (
          <article key={cert.id} className={styles.certCard}>
            <div className={styles.certIcon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 15l-2 5l9-11h-6l2-5l-9 11h6z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className={styles.certBody}>
              <span className={styles.certYear}>{cert.year}</span>
              <h3 className={styles.certName}>{cert.name}</h3>
              <span className={styles.certIssuer}>{cert.issuer}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function MobileAwards() {
  return (
    <section className={styles.section} id="awards">
      <div className={styles.sectionHeader}>
        <span className={styles.sectionLabel}>Achievement</span>
        <h2 className={styles.sectionTitle}>Awards & Recognition</h2>
      </div>

      <div className={styles.awardList}>
        {awardsData.map((award, idx) => (
          <article key={award.id} className={styles.awardCard}>
            <div className={styles.awardTop}>
              <span className={styles.awardRank}>{String(idx + 1).padStart(2, '0')}</span>
              <span className={styles.awardYear}>{award.year}</span>
            </div>
            <h3 className={styles.awardTitle}>{award.title}</h3>
            <span className={styles.awardOrg}>{award.organization}</span>
            <p className={styles.awardDesc}>{award.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function MobileFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.footerBrand}>
        <span className={styles.footerLogo}>RANI</span>
        <p className={styles.footerTagline}>
          성장하는 개발자, 더 나은 세상을 만드는 것을 지향합니다.
        </p>
      </div>

      <div className={styles.footerLinks}>
        <div className={styles.footerLinkGroup}>
          <h4 className={styles.footerLinkTitle}>Navigation</h4>
          <a href="#about" className={styles.footerLink}>About</a>
          <a href="#projects" className={styles.footerLink}>Projects</a>
          <a href="#skills" className={styles.footerLink}>Skills</a>
          <a href="#experience" className={styles.footerLink}>Experience</a>
        </div>
        <div className={styles.footerLinkGroup}>
          <h4 className={styles.footerLinkTitle}>Contact</h4>
          <a
            href="https://github.com/rani0707"
            className={styles.footerLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a href="mailto:support@raniweb.kr" className={styles.footerLink}>Email</a>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p className={styles.footerCopyright}>© {year} RANI. All rights reserved.</p>
        <div className={styles.footerSocial}>
          <a
            href="mailto:support@raniweb.kr"
            className={styles.footerSocialLink}
            aria-label="Email"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </a>
          <a
            href="https://github.com/rani0707"
            className={styles.footerSocialLink}
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}
