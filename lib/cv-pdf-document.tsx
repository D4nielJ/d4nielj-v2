import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";
import { ResolvedCV } from "@/lib/getCVByRole";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: "Helvetica",
    lineHeight: 1.4,
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4,
  },
  title: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
  },
  contactRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 6,
    color: "#444",
  },
  summary: {
    marginTop: 8,
    color: "#333",
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 4,
  },
  card: {
    marginBottom: 12,
    paddingBottom: 8,
  },
  cardTitle: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 9,
    color: "#666",
    marginBottom: 4,
  },
  cardDescription: {
    color: "#444",
    marginBottom: 4,
  },
  highlightList: {
    marginLeft: 12,
  },
  highlight: {
    marginBottom: 2,
  },
  badgeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
    marginTop: 6,
  },
  badge: {
    backgroundColor: "#f0f0f0",
    padding: "2 6",
    fontSize: 8,
  },
  skillCategory: {
    marginBottom: 8,
  },
  skillCategoryTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#666",
    marginBottom: 4,
  },
  skillList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  projectGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  projectCard: {
    width: "48%",
    marginBottom: 8,
  },
  link: {
    color: "#0066cc",
    textDecoration: "none",
  },
  linksRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 4,
  },
});

interface CVPdfDocumentProps {
  cv: ResolvedCV;
  labels: Record<string, string>;
}

function formatDateRange(startDate: string, endDate?: string): string {
  const formatDate = (date: string) => {
    const [year, month] = date.split("-");
    return new Date(Number(year), Number(month) - 1).toLocaleDateString(
      "en-US",
      {
        month: "short",
        year: "numeric",
      },
    );
  };
  return `${formatDate(startDate)} — ${
    endDate ? formatDate(endDate) : "Present"
  }`;
}

export function CVPdfDocument({ cv, labels }: CVPdfDocumentProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{cv.profile.name}</Text>
          <Text style={styles.title}>{cv.profile.title}</Text>
          <View style={styles.contactRow}>
            <Text>{cv.profile.email}</Text>
            <Text>{cv.profile.phone}</Text>
            <Text>{cv.profile.location}</Text>
          </View>
          <View style={styles.linksRow}>
            {cv.profile.links.map((link) => (
              <Link key={link.url} src={link.url} style={styles.link}>
                {link.label}
              </Link>
            ))}
          </View>
          <Text style={styles.summary}>{cv.profile.summary}</Text>
          {cv.profile.roleSummary && (
            <Text style={[styles.summary, { color: "#666" }]}>
              {cv.profile.roleSummary}
            </Text>
          )}
        </View>

        {/* Experience */}
        {cv.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{labels.experience}</Text>
            {cv.experience.map((exp) => (
              <View key={exp.id} style={styles.card}>
                <Text style={styles.cardTitle}>{exp.role}</Text>
                <Text style={styles.cardSubtitle}>
                  {exp.company} · {formatDateRange(exp.startDate, exp.endDate)}
                </Text>
                <Text style={styles.cardDescription}>{exp.description}</Text>
                {exp.highlights.length > 0 && (
                  <View style={styles.highlightList}>
                    {exp.highlights.map((h, i) => (
                      <Text key={i} style={styles.highlight}>
                        • {h}
                      </Text>
                    ))}
                  </View>
                )}
                <View style={styles.badgeRow}>
                  {exp.keywords.map((k) => (
                    <Text key={k} style={styles.badge}>
                      {k}
                    </Text>
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        {cv.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{labels.projects}</Text>
            <View style={styles.projectGrid}>
              {cv.projects.map((proj) => (
                <View key={proj.id} style={styles.projectCard}>
                  <Text style={styles.cardTitle}>{proj.name}</Text>
                  <Text style={styles.cardDescription}>{proj.description}</Text>
                  <View style={styles.badgeRow}>
                    {proj.keywords.map((k) => (
                      <Text key={k} style={styles.badge}>
                        {k}
                      </Text>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Skills */}
        {cv.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{labels.skills}</Text>
            {cv.skills.map((skillSet) => (
              <View key={skillSet.id} style={styles.skillCategory}>
                <Text style={styles.skillCategoryTitle}>
                  {skillSet.category}
                </Text>
                <View style={styles.skillList}>
                  {skillSet.skills.map((skill) => (
                    <Text key={skill} style={styles.badge}>
                      {skill}
                    </Text>
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {cv.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{labels.education}</Text>
            {cv.education.map((edu) => (
              <View key={edu.id} style={styles.card}>
                <Text style={styles.cardTitle}>{edu.degree}</Text>
                <Text style={styles.cardSubtitle}>
                  {edu.institution} ·{" "}
                  {formatDateRange(edu.startDate, edu.endDate)}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Reasoning */}
        {cv.reasoning.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{labels.reasoning}</Text>
            {cv.reasoning.map((item) => (
              <View key={item.id} style={styles.card}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSubtitle}>{item.scenario}</Text>
                <Text style={styles.cardDescription}>{item.approach}</Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}
