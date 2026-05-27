import React, { useState, useEffect } from 'react';
import { Mail, Copy, Check, ArrowUpRight, MapPin, Clock } from 'lucide-react';

const InstagramIcon = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" style={{ verticalAlign: 'middle' }}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);

const DiscordIcon = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" style={{ verticalAlign: 'middle' }}>
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.894.076.076 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z" />
  </svg>
);

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(null);
  const [discordStats, setDiscordStats] = useState(null);
  const [discordLoading, setDiscordLoading] = useState(true);

  useEffect(() => {
    fetch('https://discord.com/api/v9/invites/bahjQrDjw?with_counts=true')
      .then(res => res.json())
      .then(data => {
        if (data && data.guild) {
          setDiscordStats({
            name: data.guild.name,
            description: data.guild.description || 'Join our motion design, video editing, and visual identity community.',
            iconUrl: data.guild.icon 
              ? `https://cdn.discordapp.com/icons/${data.guild.id}/${data.guild.icon}.png` 
              : null,
            members: data.approximate_member_count || 120,
            online: data.approximate_presence_count || 15
          });
        }
        setDiscordLoading(false);
      })
      .catch(err => {
        console.log('Error fetching Discord details:', err);
        setDiscordStats({
          name: 'YAR YASH STUDIO',
          description: 'A visual design community for creators, motion designers, and video editors.',
          iconUrl: null,
          members: 142,
          online: 26
        });
        setDiscordLoading(false);
      });
  }, []);

  const handleCopy = (email) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const emailPrimary   = 'srivastavayash970@gmail.com';
  const emailSecondary = 'yashsrivastava687@gmail.com';

  return (
    <section id="contact" className="contact-section">
      <div className="container">

        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">CONTACT</span>
          <h2 className="section-title">Let's Work Together</h2>
          <p className="section-desc">
            Available for freelance design contracts, motion graphics, and visual identity projects. Reach out directly — I respond within 24 hours.
          </p>
        </div>

        <div className="contact-layout">

          {/* Left: Big Status Card */}
          <div className="contact-left-panel">
            <div className="contact-status-card">
              <div className="contact-status-header">
                <span className="contact-status-tag">CURRENT STATUS</span>
              </div>
              <div className="contact-status-body">
                <div className="contact-availability-badge">
                  <span className="pulse-dot"></span>
                  <span>Accepting Projects — Q2/Q3 2026</span>
                </div>

                <h3 className="contact-big-text">
                  Bring your<br />
                  <em>visual story</em><br />
                  to life.
                </h3>

                <div className="contact-meta-row">
                  <MapPin size={13} />
                  <span>India — Remote Worldwide</span>
                </div>
                <div className="contact-meta-row">
                  <Clock size={13} />
                  <span>Response Time: Within 24hrs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Channels */}
          <div className="contact-right-panel">

            {/* Email 1 */}
            <div className="contact-channel-row">
              <div className="channel-icon-wrap">
                <Mail size={16} />
              </div>
              <div className="channel-content">
                <span className="channel-type-label">Primary Email</span>
                <a href={`mailto:${emailPrimary}`} className="channel-address">
                  {emailPrimary}
                </a>
              </div>
              <button
                className="channel-action-btn"
                onClick={() => handleCopy(emailPrimary)}
                aria-label="Copy primary email"
              >
                {copiedEmail === emailPrimary ? <Check size={15} className="copied-ok" /> : <Copy size={15} />}
              </button>
            </div>

            {/* Email 2 */}
            <div className="contact-channel-row">
              <div className="channel-icon-wrap">
                <Mail size={16} />
              </div>
              <div className="channel-content">
                <span className="channel-type-label">Alternate Email</span>
                <a href={`mailto:${emailSecondary}`} className="channel-address">
                  {emailSecondary}
                </a>
              </div>
              <button
                className="channel-action-btn"
                onClick={() => handleCopy(emailSecondary)}
                aria-label="Copy secondary email"
              >
                {copiedEmail === emailSecondary ? <Check size={15} className="copied-ok" /> : <Copy size={15} />}
              </button>
            </div>

            {/* Instagram */}
            <div className="contact-channel-row">
              <div className="channel-icon-wrap ig-icon">
                <InstagramIcon />
              </div>
              <div className="channel-content">
                <span className="channel-type-label">Instagram</span>
                <a
                  href="https://www.instagram.com/yar_yash25/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="channel-address ig-handle"
                >
                  @yar_yash25
                </a>
              </div>
              <a
                href="https://www.instagram.com/yar_yash25/"
                target="_blank"
                rel="noopener noreferrer"
                className="channel-action-btn"
                aria-label="Open Instagram"
              >
                <ArrowUpRight size={15} />
              </a>
            </div>

            {/* Discord Live Status Console Card */}
            <div className="contact-discord-card">
              <div className="discord-card-glow"></div>
              
              <div className="dcard-header">
                <div className="dcard-status-dot pulsing-blurple"></div>
                <span className="dcard-header-tag">[ LIVE TRANSMISSION SOCKET ]</span>
                <DiscordIcon size={12} />
              </div>

              {discordLoading ? (
                <div className="dcard-loading">
                  <div className="dcard-loading-pulse"></div>
                  <span>ESTABLISHING CORNER SIGNAL...</span>
                </div>
              ) : (
                <div className="dcard-body">
                  <div className="dcard-server-profile">
                    {discordStats.iconUrl ? (
                      <img src={discordStats.iconUrl} alt="Server icon" className="dcard-server-avatar" />
                    ) : (
                      <div className="dcard-server-avatar-fallback">
                        <DiscordIcon size={20} />
                      </div>
                    )}
                    <div className="dcard-server-info">
                      <h4 className="dcard-server-name">{discordStats.name}</h4>
                      <p className="dcard-server-desc">{discordStats.description}</p>
                    </div>
                  </div>

                  <div className="dcard-stats-hud">
                    <div className="dcard-stat">
                      <span className="dcard-dot green-dot"></span>
                      <span className="dcard-val">{discordStats.online} Online</span>
                    </div>
                    <div className="dcard-stat">
                      <span className="dcard-dot grey-dot"></span>
                      <span className="dcard-val">{discordStats.members} Members</span>
                    </div>
                  </div>

                  <a 
                    href="https://discord.gg/bahjQrDjw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dcard-launch-btn"
                  >
                    <span>COMMENCE CONNECTION</span>
                    <ArrowUpRight size={13} className="dcard-launch-icon" />
                  </a>
                </div>
              )}
            </div>

            {/* Divider line */}
            <div className="contact-services-divider">
              <span className="contact-services-tag">SERVICES OFFERED</span>
            </div>

            {/* Service Tags */}
            <div className="contact-service-tags">
              {[
                'Graphic Design', 'Brand Identity', 'UI/UX Design',
                'Video Editing', 'Motion Graphics', 'Social Media Design',
                'Photo Editing', 'Freelance Consulting',
              ].map((s) => (
                <span key={s} className="contact-service-pill">{s}</span>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
