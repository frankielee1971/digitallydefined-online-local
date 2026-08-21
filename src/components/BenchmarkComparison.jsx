import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, Target, ArrowRight } from 'lucide-react';

/**
 * BenchmarkComparison
 * 
 * Shows users how their results compare to anonymized aggregates.
 * Includes AI-powered interpretation from Hermes.
 */

export default function BenchmarkComparison({ 
  userResults, 
  benchmarkData, 
  onAskHermes 
}) {
  const [comparison, setComparison] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userResults && benchmarkData) {
      const comp = calculateComparison(userResults, benchmarkData);
      setComparison(comp);
      setLoading(false);
    }
  }, [userResults, benchmarkData]);

  if (loading || !comparison) return null;

  const getPercentileLabel = (percentile) => {
    if (percentile >= 80) return { text: 'Top 20%', tone: 'positive' };
    if (percentile >= 50) return { text: 'Above Average', tone: 'neutral' };
    return { text: 'Below Average', tone: 'needs-work' };
  };

  const getIcon = (metricType) => {
    switch (metricType) {
      case 'retirement_gap': return TrendingUp;
      case 'niche_score': return Target;
      case 'freedom_progress': return Users;
      default: return TrendingUp;
    }
  };

  return (
    <section className="benchmark-comparison">
      <div className="benchmark-comparison__header">
        <h3>How You Compare</h3>
        <p className="benchmark-comparison__subtitle">
          Based on anonymized data from {benchmarkData.sampleSize.toLocaleString()} users
        </p>
      </div>

      <div className="benchmark-comparison__grid">
        {comparison.metrics.map((metric, idx) => {
          const Icon = getIcon(metric.type);
          const percentileLabel = getPercentileLabel(metric.percentile);
          
          return (
            <div key={idx} className="benchmark-card">
              <div className="benchmark-card__icon">
                <Icon size={20} />
              </div>
              
              <div className="benchmark-card__content">
                <h4>{metric.label}</h4>
                
                <div className="benchmark-card__value">
                  <span className="benchmark-card__your-value">
                    {metric.yourValue}
                  </span>
                  <span className="benchmark-card__vs">vs</span>
                  <span className="benchmark-card__avg-value">
                    {metric.avgValue} avg
                  </span>
                </div>

                <div className="benchmark-card__percentile">
                  <div className="percentile-bar">
                    <div 
                      className={`percentile-fill percentile-fill--${percentileLabel.tone}`}
                      style={{ width: `${metric.percentile}%` }}
                    />
                  </div>
                  <span className={`percentile-label percentile-label--${percentileLabel.tone}`}>
                    {percentileLabel.text} ({metric.percentile}th percentile)
                  </span>
                </div>

                {metric.insight && (
                  <p className="benchmark-card__insight">{metric.insight}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {comparison.overallInsight && (
        <div className="benchmark-comparison__ai-insight">
          <div className="ai-badge">
            <span>✨</span>
            <span>Hermes Insight</span>
          </div>
          <p>{comparison.overallInsight}</p>
          <button 
            className="btn btn--outline btn--sm"
            onClick={() => onAskHermes?.(comparison)}
          >
            Ask Hermes to explain →
          </button>
        </div>
      )}

      {comparison.recommendedActions?.length > 0 && (
        <div className="benchmark-comparison__actions">
          <h4>Recommended Next Steps:</h4>
          <ul>
            {comparison.recommendedActions.map((action, idx) => (
              <li key={idx}>
                <ArrowRight size={16} />
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

function calculateComparison(userResults, benchmarkData) {
  const metrics = [];

  // Retirement Gap Comparison
  if (userResults.gap !== undefined && benchmarkData.retirementGap) {
    const avgGap = benchmarkData.retirementGap.average || 0;
    const percentile = calculatePercentile(userResults.gap, benchmarkData.retirementGap.distribution, true);
    
    metrics.push({
      type: 'retirement_gap',
      label: 'Retirement Gap',
      yourValue: formatMoney(userResults.gap),
      avgValue: formatMoney(avgGap),
      percentile,
      insight: userResults.gap < avgGap 
        ? 'Your gap is smaller than average - great job planning ahead!'
        : 'Your gap is larger than average, but you\'re taking the right steps by addressing it now.'
    });
  }

  // Niche Score Comparison
  if (userResults.score !== undefined && benchmarkData.nicheScore) {
    const avgScore = benchmarkData.nicheScore.average || 50;
    const percentile = calculatePercentile(userResults.score, benchmarkData.nicheScore.distribution, false);
    
    metrics.push({
      type: 'niche_score',
      label: 'Niche Viability Score',
      yourValue: `${userResults.score}/100`,
      avgValue: `${Math.round(avgScore)}/100 avg`,
      percentile,
      insight: userResults.score >= 70
        ? 'Your niche scores in the top tier - strong potential for success!'
        : userResults.score >= 50
        ? 'Your niche has moderate potential with room for optimization.'
        : 'Consider refining your niche or exploring alternatives with higher scores.'
    });
  }

  // Freedom Progress Comparison
  if (userResults.freedomProgress !== undefined && benchmarkData.freedomProgress) {
    const avgProgress = benchmarkData.freedomProgress.average || 0;
    const percentile = calculatePercentile(userResults.freedomProgress, benchmarkData.freedomProgress.distribution, false);
    
    metrics.push({
      type: 'freedom_progress',
      label: 'Freedom Number Progress',
      yourValue: `${Math.round(userResults.freedomProgress)}%`,
      avgValue: `${Math.round(avgProgress)}% avg`,
      percentile,
      insight: userResults.freedomProgress >= 80
        ? 'You\'re very close to your freedom number - keep pushing!'
        : userResults.freedomProgress >= 50
        ? 'You\'re halfway there - momentum is building.'
        : 'Focus on increasing asset count or yield to accelerate progress.'
    });
  }

  // Calculate overall insight
  const avgPercentile = metrics.length > 0 
    ? Math.round(metrics.reduce((sum, m) => sum + m.percentile, 0) / metrics.length)
    : 0;

  let overallInsight = '';
  if (avgPercentile >= 70) {
    overallInsight = `You're outperforming ${avgPercentile}% of users across key metrics. Your strategy is working well - focus on scaling what you're already doing right.`;
  } else if (avgPercentile >= 40) {
    overallInsight = `You're performing around average compared to other users. With a few targeted adjustments, you could significantly improve your outcomes.`;
  } else {
    overallInsight = `You're in the early stages compared to other users. The good news: you now have clarity on your gap, and small consistent actions will compound quickly.`;
  }

  // Generate recommended actions
  const recommendedActions = [];
  
  if (metrics.find(m => m.percentile < 30)) {
    recommendedActions.push('Schedule a 15-minute session with Hermes to create a personalized improvement plan');
  }
  
  if (userResults.gap > 0 && userResults.gap < 50000) {
    recommendedActions.push('Focus on adding one income-generating asset in the next 30 days');
  }
  
  if (userResults.score < 60) {
    recommendedActions.push('Revisit the Niche Scorecard with adjusted parameters or explore alternative niches');
  }
  
  if (recommendedActions.length === 0) {
    recommendedActions.push('Continue executing your current strategy and track progress monthly');
  }

  return {
    metrics,
    overallInsight,
    recommendedActions,
    avgPercentile
  };
}

function calculatePercentile(value, distribution, lowerIsBetter = false) {
  if (!distribution || !Array.isArray(distribution)) {
    return 50; // Default to median if no distribution data
  }

  const sorted = lowerIsBetter 
    ? [...distribution].sort((a, b) => b - a)  // For gap, lower is better
    : [...distribution].sort((a, b) => a - b); // For scores, higher is better
  
  const index = sorted.findIndex(v => (lowerIsBetter ? v <= value : v >= value));
  
  if (index === -1) {
    return lowerIsBetter ? 90 : 10;
  }
  
  return Math.round(((sorted.length - index) / sorted.length) * 100);
}

function formatMoney(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}
