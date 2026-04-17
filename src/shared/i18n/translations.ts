export type Language = 'en' | 'ko'

type TranslationStrings = {
  // Settings UI
  'settings.title': string
  'settings.ui': string
  'settings.ui.theme': string
  'settings.ui.theme.tooltip': string
  'settings.ui.language': string
  'settings.ui.language.tooltip': string
  'settings.ui.codeFontLigatures': string
  'settings.ui.codeFontLigatures.tooltip': string
  'settings.ui.enableMultiStatementMode': string
  'settings.ui.enableMultiStatementMode.tooltip': string

  'settings.preferences': string
  'settings.preferences.initCmd': string
  'settings.preferences.initCmd.tooltip': string
  'settings.preferences.connectionTimeout': string
  'settings.preferences.connectionTimeout.tooltip': string
  'settings.preferences.useReadTransactions': string
  'settings.preferences.useReadTransactions.tooltip': string

  'settings.resultFrames': string
  'settings.resultFrames.maxFrames': string
  'settings.resultFrames.maxFrames.tooltip': string
  'settings.resultFrames.maxHistory': string
  'settings.resultFrames.maxHistory.tooltip': string
  'settings.resultFrames.scrollToTop': string
  'settings.resultFrames.scrollToTop.tooltip': string

  'settings.graphViz': string
  'settings.graphViz.initialNodeDisplay': string
  'settings.graphViz.initialNodeDisplay.tooltip': string
  'settings.graphViz.maxNeighbours': string
  'settings.graphViz.maxNeighbours.tooltip': string
  'settings.graphViz.maxRows': string
  'settings.graphViz.maxRows.tooltip': string
  'settings.graphViz.maxFieldItems': string
  'settings.graphViz.maxFieldItems.tooltip': string
  'settings.graphViz.autoComplete': string
  'settings.graphViz.autoComplete.tooltip': string
  'settings.graphViz.showWheelZoomInfo': string
  'settings.graphViz.showWheelZoomInfo.tooltip': string

  'settings.analytics': string
  'settings.analytics.crashReports': string
  'settings.analytics.crashReports.tooltip': string
  'settings.analytics.userStats': string
  'settings.analytics.userStats.tooltip': string
  'settings.analytics.notLoaded': string
  'settings.experimentalFeatures': string

  // Graph editing - toast messages
  'editing.toast.clickNodeToConnect': string
  'editing.toast.relationshipCreated': string
  'editing.toast.clickNodeToReconnect': string
  'editing.toast.reconnected': string
  'editing.toast.nodeCreated': string
  'editing.toast.batchDeleted': string
  'editing.toast.relModeEnabled': string
  'editing.toast.reconnectSource': string
  'editing.toast.reconnectTarget': string
  'editing.toast.saved': string
  'editing.toast.saveFailed': string
  'editing.toast.selectTwoDifferentNodes': string
  'editing.toast.saveNewNodesFirst': string

  // Graph editing - validation
  'editing.validation.emptyLabel': string
  'editing.validation.emptyPropertyKey': string
  'editing.validation.duplicatePropertyKey': string
  'editing.validation.emptyRelType': string

  // Graph editing - multi-select panel
  'editing.panel.multiSelect.itemsSelected': string
  'editing.panel.multiSelect.nodes': string
  'editing.panel.multiSelect.relationships': string
  'editing.panel.multiSelect.deleteSelected': string
  'editing.panel.collapse': string
  'editing.panel.expand': string

  // Graph editing - changes panel
  'editing.changes.title': string
  'editing.changes.pendingChanges': string
  'editing.changes.saveAll': string
  'editing.changes.saving': string
  'editing.changes.cancel': string
  'editing.changes.noChanges': string
  'editing.changes.create': string
  'editing.changes.delete': string
  'editing.changes.labels': string
  'editing.changes.type': string
  'editing.changes.rewire': string
  'editing.changes.props': string
  'editing.changes.node': string
  'editing.changes.rel': string

  // Graph editing - details pane
  'editing.details.nodeProperties': string
  'editing.details.relationshipProperties': string
  'editing.details.copyAll': string
  'editing.details.relType': string
  'editing.details.relTypePlaceholder': string
  'editing.details.reverseDirection': string
  'editing.details.deleteRelationship': string
  'editing.details.nodeLabels': string
  'editing.details.nodeLabelsPlaceholder': string

  // Graph editing - properties table
  'editing.props.showAll': string
  'editing.props.editKey': string
  'editing.props.editValue': string
  'editing.props.removeProperty': string
  'editing.props.copyKeyValue': string
  'editing.props.newKey': string
  'editing.props.newKeyPlaceholder': string
  'editing.props.newValue': string
  'editing.props.newValuePlaceholder': string
  'editing.props.addProperty': string

  // StartPreviewFrame
  'start.graphEditing.title': string
  'start.graphEditing.lead': string
  'start.graphEditing.bullet1': string
  'start.graphEditing.bullet2': string
  'start.graphEditing.bullet3': string
  'start.graphEditing.openGuide': string
  'start.tryNeo4j.title': string
  'start.tryNeo4j.lead': string
  'start.tryNeo4j.description': string
  'start.hostedBrowser.title': string
  'start.hostedBrowser.description': string
  'start.hostedBrowser.button': string

  // Graph Editing Guide
  'guide.graphEditing.title': string
  'guide.graphEditing.identifier': string
  'guide.s1.title': string
  'guide.s1.lead': string
  'guide.s1.desc': string
  'guide.s1.li1': string
  'guide.s1.li2': string
  'guide.s1.li3': string
  'guide.s2.title': string
  'guide.s2.lead': string
  'guide.s2.createTitle': string
  'guide.s2.createDesc': string
  'guide.s2.labelsTitle': string
  'guide.s2.labelsDesc': string
  'guide.s2.deleteTitle': string
  'guide.s2.deleteDesc': string
  'guide.s3.title': string
  'guide.s3.lead': string
  'guide.s3.editTitle': string
  'guide.s3.editDesc': string
  'guide.s3.addTitle': string
  'guide.s3.addDesc': string
  'guide.s3.removeTitle': string
  'guide.s3.removeDesc': string
  'guide.s3.validationTitle': string
  'guide.s3.validationDesc': string
  'guide.s4.title': string
  'guide.s4.lead': string
  'guide.s4.createTitle': string
  'guide.s4.createDesc': string
  'guide.s4.typeTitle': string
  'guide.s4.typeDesc': string
  'guide.s4.reverseTitle': string
  'guide.s4.reverseDesc': string
  'guide.s4.reconnectTitle': string
  'guide.s4.reconnectDesc': string
  'guide.s4.deleteTitle': string
  'guide.s4.deleteDesc': string
  'guide.s5.title': string
  'guide.s5.lead': string
  'guide.s5.desc1': string
  'guide.s5.desc2': string
  'guide.s5.desc3': string
  'guide.s6.title': string
  'guide.s6.lead': string
  'guide.s6.desc': string
  'guide.s6.categoriesTitle': string
  'guide.s6.createLabel': string
  'guide.s6.createDesc': string
  'guide.s6.deleteLabel': string
  'guide.s6.deleteDesc': string
  'guide.s6.modifyLabel': string
  'guide.s6.modifyDesc': string
  'guide.s6.saveTitle': string
  'guide.s6.saveDesc': string
  'guide.s6.revertDesc': string

  // Frame titlebar
  'frame.pin': string
  'frame.expand': string
  'frame.collapse': string
  'frame.fullscreen': string
  'frame.closeFullscreen': string
  'frame.close': string

  // About page
  'about.title': string
  'about.madeBy': string
  'about.copyright': string
  'about.youAreRunning': string
  'about.browserVersion': string
  'about.serverVersion': string
  'about.changelog': string
  'about.buildNumber': string
  'about.buildHash': string
  'about.buildDate': string
  'about.license': string
  'about.licenseDesc': string
  'about.participate': string
  'about.discussOn': string
  'about.askQuestions': string
  'about.visitMeetup': string
  'about.contributeCode': string
  'about.sendFeedback': string
  'about.thanks': string
  'about.thanksDesc': string
  'about.footer': string

  // Overview pane (neo4j-arc)
  'overview.title': string
  'overview.nodeLabels': string
  'overview.relTypes': string
  'overview.showing': string
  'overview.truncatedFields': string
  'overview.displaying': string

  // Default details pane (neo4j-arc)
  'defaultDetails.nodeProperties': string
  'defaultDetails.relProperties': string
  'defaultDetails.copyAll': string

  // Unfound guide
  'unfound.title': string
  'unfound.desc': string
  'unfound.try': string
  'unfound.helpDesc': string
  'unfound.guideDesc': string
  'unfound.docsDesc': string

  // Intro guide
  'intro.title': string
  'intro.s1.title': string
  'intro.s1.desc': string
  'intro.s1.li1': string
  'intro.s1.li2': string
  'intro.s1.li3': string
  'intro.s1.li4': string
  'intro.s2.title': string
  'intro.s2.lead': string
  'intro.s2.desc': string
  'intro.s2.execute': string
  'intro.s2.prevHistory': string
  'intro.s2.nextHistory': string
  'intro.s2.keybindingHint': string
  'intro.s3.title': string
  'intro.s3.lead': string
  'intro.s3.desc': string
  'intro.s3.li1': string
  'intro.s3.li2': string
  'intro.s3.li3': string
  'intro.s3.li4': string
  'intro.s4.title': string
  'intro.s4.lead': string
  'intro.s4.desc1': string
  'intro.s4.desc2': string
  'intro.s5.title': string
  'intro.s5.lead': string
  'intro.s5.desc': string
  'intro.s6.title': string
  'intro.s6.lead': string
  'intro.s6.desc1': string
  'intro.s6.desc2': string
  'intro.s7.title': string
  'intro.s7.lead': string
  'intro.s7.desc1': string
  'intro.s7.desc2': string
  'intro.s8.title': string
  'intro.s8.conceptsLink': string
  'intro.s8.cypherLink': string
  'intro.s8.references': string
  'intro.s8.helpCommands': string
  'intro.s8.helpKeys': string

  // Concepts guide
  'concepts.title': string
  'concepts.s1.title': string
  'concepts.s1.lead': string
  'concepts.s1.desc': string
  'concepts.s1.li1': string
  'concepts.s1.li2': string
  'concepts.s1.li3': string
  'concepts.s1.li4': string
  'concepts.s2.title': string
  'concepts.s2.lead': string
  'concepts.s2.desc': string
  'concepts.s2.li1': string
  'concepts.s2.li2': string
  'concepts.s2.li3': string
  'concepts.s2.keyInfo': string
  'concepts.s2.ki1': string
  'concepts.s2.ki2': string
  'concepts.s2.ki3': string
  'concepts.s3.title': string
  'concepts.s3.lead': string
  'concepts.s3.desc': string
  'concepts.s3.li1': string
  'concepts.s3.li2': string
  'concepts.s3.keyInfo': string
  'concepts.s3.ki1': string
  'concepts.s3.ki2': string
  'concepts.s4.title': string
  'concepts.s4.lead': string
  'concepts.s4.desc': string
  'concepts.s4.li1': string
  'concepts.s4.li2': string
  'concepts.s4.li3': string
  'concepts.s4.li4': string
  'concepts.s4.li5': string
  'concepts.s4.keyInfo': string
  'concepts.s4.ki1': string
  'concepts.s4.ki2': string
  'concepts.s4.ki3': string
  'concepts.s4.ki4': string
  'concepts.s5.title': string
  'concepts.s5.lead': string
  'concepts.s5.desc1': string
  'concepts.s5.desc2': string
  'concepts.s5.li1': string
  'concepts.s5.li2': string
  'concepts.s5.li3': string
  'concepts.s5.keyInfo': string
  'concepts.s5.ki1': string
  'concepts.s5.ki2': string
  'concepts.s5.ki3': string
  'concepts.s6.title': string
  'concepts.s6.lead': string
  'concepts.s6.desc': string
  'concepts.s6.li1': string
  'concepts.s6.li2': string
  'concepts.s6.li3': string
  'concepts.s7.title': string
  'concepts.s7.cypherLink': string

  // Cypher guide
  'cypher.title': string
  'cypher.s1.lead': string
  'cypher.s1.desc': string
  'cypher.s1.li1': string
  'cypher.s1.li2': string
  'cypher.s1.li3': string
  'cypher.s2.title': string
  'cypher.s2.lead': string
  'cypher.s2.desc': string
  'cypher.s2.note': string
  'cypher.s2.clickCode': string
  'cypher.s2.createExplain': string
  'cypher.s2.parenExplain': string
  'cypher.s2.varExplain': string
  'cypher.s2.propsExplain': string
  'cypher.s2.runButton': string
  'cypher.s3.title': string
  'cypher.s3.lead': string
  'cypher.s3.desc': string
  'cypher.s3.clickCode': string
  'cypher.s3.matchExplain': string
  'cypher.s3.patternExplain': string
  'cypher.s3.whereExplain': string
  'cypher.s3.compareExplain': string
  'cypher.s3.returnExplain': string
  'cypher.s3.runButton': string
  'cypher.s4.title': string
  'cypher.s4.lead': string
  'cypher.s4.desc': string
  'cypher.s5.title': string
  'cypher.s5.lead': string
  'cypher.s5.desc': string
  'cypher.s5.matchExplain': string
  'cypher.s5.eeExplain': string
  'cypher.s5.knowsExplain': string
  'cypher.s5.friendsExplain': string
  'cypher.s5.returnExplain': string
  'cypher.s6.title': string
  'cypher.s6.movieLink': string
  'cypher.s6.northwindLink': string
  'cypher.s6.references': string
  'cypher.s6.helpCommands': string
  'cypher.s6.helpKeys': string

  // Movie graph guide
  'movie.title': string
  'movie.s1.desc': string
  'movie.s1.showHow': string
  'movie.s1.load': string
  'movie.s1.constrain': string
  'movie.s1.index': string
  'movie.s1.find': string
  'movie.s1.query': string
  'movie.s1.solve': string
  'movie.s2.title': string
  'movie.s2.lead': string
  'movie.s2.desc': string
  'movie.s2.note': string
  'movie.s2.clickCode': string
  'movie.s2.runButton': string
  'movie.s2.wait': string
  'movie.s3.title': string
  'movie.s3.lead': string
  'movie.s3.desc': string
  'movie.s4.title': string
  'movie.s4.lead': string
  'movie.s5.title': string
  'movie.s5.lead': string
  'movie.s5.li1': string
  'movie.s5.li2': string
  'movie.s5.li3': string
  'movie.s5.findTom': string
  'movie.s5.findCloud': string
  'movie.s5.find10': string
  'movie.s5.find90s': string
  'movie.s6.title': string
  'movie.s6.lead': string
  'movie.s6.desc': string
  'movie.s6.q1': string
  'movie.s6.q2': string
  'movie.s6.q3': string
  'movie.s6.q4': string
  'movie.s7.title': string
  'movie.s7.lead': string
  'movie.s7.desc': string
  'movie.s7.q1desc': string
  'movie.s7.q2desc': string
  'movie.s8.title': string
  'movie.s8.lead': string
  'movie.s8.desc': string
  'movie.s8.forTom': string
  'movie.s8.li1': string
  'movie.s8.li2': string
  'movie.s9.title': string
  'movie.s9.lead': string
  'movie.s9.desc': string
  'movie.s9.note': string
  'movie.s9.li1': string
  'movie.s9.li2': string
  'movie.s10.title': string
  'movie.s10.northwindLink': string
  'movie.s10.gistLink': string
  'movie.s10.docsTitle': string

  // Northwind graph guide
  'northwind.title': string
  'northwind.s1.lead': string
  'northwind.s1.desc': string
  'northwind.s1.showHow': string
  'northwind.s1.load': string
  'northwind.s1.index': string
  'northwind.s1.relate': string
  'northwind.s1.promote': string
  'northwind.s2.title': string
  'northwind.s2.lead': string
  'northwind.s2.desc': string
  'northwind.s2.csvNote': string
  'northwind.s2.loadProduct': string
  'northwind.s2.loadCategory': string
  'northwind.s2.loadSupplier': string
  'northwind.s3.title': string
  'northwind.s3.lead': string
  'northwind.s4.title': string
  'northwind.s4.lead': string
  'northwind.s4.desc': string
  'northwind.s5.title': string
  'northwind.s5.lead': string
  'northwind.s5.desc': string
  'northwind.s5.q1': string
  'northwind.s5.q2': string
  'northwind.s6.title': string
  'northwind.s6.lead': string
  'northwind.s6.desc': string
  'northwind.s6.loadCustomer': string
  'northwind.s6.loadOrder': string
  'northwind.s7.title': string
  'northwind.s7.lead': string
  'northwind.s8.title': string
  'northwind.s8.lead': string
  'northwind.s9.title': string
  'northwind.s9.lead': string
  'northwind.s9.desc': string
  'northwind.s9.promote': string
  'northwind.s10.title': string
  'northwind.s10.lead': string
  'northwind.s10.desc': string
  'northwind.s11.title': string
}

const en: TranslationStrings = {
  // Settings UI
  'settings.title': 'Browser Settings',
  'settings.ui': 'User Interface',
  'settings.ui.theme': 'Theme',
  'settings.ui.theme.tooltip':
    'Use "Auto" to have neo4j-browser detect system dark vs. light mode if available.',
  'settings.ui.language': 'Language',
  'settings.ui.language.tooltip':
    'Select the display language for the browser interface.',
  'settings.ui.codeFontLigatures': 'Code font ligatures',
  'settings.ui.codeFontLigatures.tooltip':
    'Use font ligatures for the command bar and cypher snippets',
  'settings.ui.enableMultiStatementMode': 'Enable multi statement query editor',
  'settings.ui.enableMultiStatementMode.tooltip':
    'Allows query editor to execute multiple statements',

  'settings.preferences': 'Preferences',
  'settings.preferences.initCmd': 'Initial command to execute',
  'settings.preferences.initCmd.tooltip':
    'This commands is executed once connected to a graph.',
  'settings.preferences.connectionTimeout': 'Connection timeout (ms)',
  'settings.preferences.connectionTimeout.tooltip':
    'The timeout in milliseconds when establishing a connection to Neo4j.',
  'settings.preferences.useReadTransactions':
    'Use read transactions for cypher queries.',
  'settings.preferences.useReadTransactions.tooltip':
    'This setting can be useful in a cluster environment where you want to ensure that read queries are sent to secondaries.',

  'settings.resultFrames': 'Result Frames',
  'settings.resultFrames.maxFrames': 'Maximum number of result frames',
  'settings.resultFrames.maxFrames.tooltip':
    'Max number of result frames. When reached, old frames gets retired.',
  'settings.resultFrames.maxHistory': 'Max history length',
  'settings.resultFrames.maxHistory.tooltip':
    'Max number of history entries. When reached, old entries gets retired.',
  'settings.resultFrames.scrollToTop': 'Scroll to top when adding frames',
  'settings.resultFrames.scrollToTop.tooltip':
    'Automatically scroll stream to top on new frames.',

  'settings.graphViz': 'Graph Visualization',
  'settings.graphViz.initialNodeDisplay': 'Initial Node Display',
  'settings.graphViz.initialNodeDisplay.tooltip':
    'Limit number of nodes displayed on first load of the graph visualization.',
  'settings.graphViz.maxNeighbours': 'Max neighbours from vis interaction',
  'settings.graphViz.maxNeighbours.tooltip':
    'Limit exploratory queries to this limit.',
  'settings.graphViz.maxRows': 'Result view max rows',
  'settings.graphViz.maxRows.tooltip':
    "Max number of rows to render in 'Rows' result view",
  'settings.graphViz.maxFieldItems': 'Max record fields',
  'settings.graphViz.maxFieldItems.tooltip':
    'Limits the number of fields per returned record',
  'settings.graphViz.autoComplete': 'Connect result nodes',
  'settings.graphViz.autoComplete.tooltip':
    'If this is checked, after a cypher query result is retrieved, a second query is executed to fetch relationships between result nodes.',
  'settings.graphViz.showWheelZoomInfo': 'Show zoom interactions hint',
  'settings.graphViz.showWheelZoomInfo.tooltip':
    'Pop-up info block with scroll interactions keybindings.',

  'settings.analytics': 'Product Analytics',
  'settings.analytics.crashReports': 'Send anonymous crash reports',
  'settings.analytics.crashReports.tooltip':
    'Crash reports allow us to quickly diagnose and fix problems. No personal information is collected or sent.',
  'settings.analytics.userStats': 'Send anonymous usage statistics',
  'settings.analytics.userStats.tooltip':
    'This data helps us prioritise features and improvements. No personal information is collected or sent.',
  'settings.analytics.notLoaded':
    'Product usage analytics is disabled before database connection is fully established.',
  'settings.experimentalFeatures': 'Experimental features',

  // Graph editing - toast
  'editing.toast.clickNodeToConnect':
    'Click another node to create relationship',
  'editing.toast.relationshipCreated': 'Relationship created',
  'editing.toast.clickNodeToReconnect': 'Click a node to reconnect',
  'editing.toast.reconnected': 'Relationship reconnected',
  'editing.toast.nodeCreated': 'New node created',
  'editing.toast.batchDeleted': 'items marked for deletion',
  'editing.toast.relModeEnabled':
    'Relationship mode enabled. Click another node to connect.',
  'editing.toast.reconnectSource': 'Reconnect source endpoint: click a node.',
  'editing.toast.reconnectTarget': 'Reconnect target endpoint: click a node.',
  'editing.toast.saved': 'Changes saved successfully.',
  'editing.toast.saveFailed': 'Failed to save changes.',
  'editing.toast.selectTwoDifferentNodes':
    'Select two different nodes for a relationship.',
  'editing.toast.saveNewNodesFirst':
    'Save newly created nodes first, then create relationships between them.',

  // Graph editing - validation
  'editing.validation.emptyLabel': 'Node must have at least one label',
  'editing.validation.emptyPropertyKey': 'Property key cannot be empty',
  'editing.validation.duplicatePropertyKey': 'Duplicate property key',
  'editing.validation.emptyRelType':
    'Relationship type cannot be empty. Defaulting to RELATED_TO',

  // Graph editing - multi-select panel
  'editing.panel.multiSelect.itemsSelected': '{count} items selected',
  'editing.panel.multiSelect.nodes': 'nodes',
  'editing.panel.multiSelect.relationships': 'relationships',
  'editing.panel.multiSelect.deleteSelected': 'Delete selected ({count})',
  'editing.panel.collapse': 'Collapse the node properties display',
  'editing.panel.expand': 'Expand the node properties display',

  // Graph editing - changes panel
  'editing.changes.title': 'Changes',
  'editing.changes.pendingChanges': 'Pending Changes ({count})',
  'editing.changes.saveAll': 'Save All',
  'editing.changes.saving': 'Saving...',
  'editing.changes.cancel': 'Cancel',
  'editing.changes.noChanges': 'No pending changes',
  'editing.changes.create': 'CREATE',
  'editing.changes.delete': 'DELETE',
  'editing.changes.labels': 'LABELS',
  'editing.changes.type': 'TYPE',
  'editing.changes.rewire': 'REWIRE',
  'editing.changes.props': 'PROPS',
  'editing.changes.node': 'Node',
  'editing.changes.rel': 'Rel',

  // Graph editing - details pane
  'editing.details.nodeProperties': 'Node properties',
  'editing.details.relationshipProperties': 'Relationship properties',
  'editing.details.copyAll': 'Copy all properties to clipboard',
  'editing.details.relType': 'Relationship type',
  'editing.details.relTypePlaceholder': 'RELATED_TO',
  'editing.details.reverseDirection': 'Reverse direction',
  'editing.details.deleteRelationship': 'Delete relationship',
  'editing.details.nodeLabels': 'Node labels',
  'editing.details.nodeLabelsPlaceholder': 'Node labels (comma separated)',

  // Graph editing - properties table
  'editing.props.showAll': ' Show all',
  'editing.props.editKey': 'Edit property key',
  'editing.props.editValue': 'Edit property value',
  'editing.props.removeProperty': 'Remove property {key}',
  'editing.props.copyKeyValue': 'Copy key and value',
  'editing.props.newKey': 'New property key',
  'editing.props.newKeyPlaceholder': 'key',
  'editing.props.newValue': 'New property value',
  'editing.props.newValuePlaceholder': 'value',
  'editing.props.addProperty': 'Add property',

  // StartPreviewFrame
  'start.graphEditing.title': 'Graph Editing',
  'start.graphEditing.lead': 'Visual editing for nodes & relationships',
  'start.graphEditing.bullet1': 'Right-click canvas to create nodes',
  'start.graphEditing.bullet2': 'Ring menu for delete & connect',
  'start.graphEditing.bullet3': 'Inline property & label editing',
  'start.graphEditing.openGuide': 'Open guide',
  'start.tryNeo4j.title': 'Try Neo4j with live data',
  'start.tryNeo4j.lead':
    'A complete example graph that demonstrates common query patterns.',
  'start.tryNeo4j.description':
    'Actors & movies in cross-referenced pop culture.',
  'start.hostedBrowser.title': 'Try the new hosted Browser!',
  'start.hostedBrowser.description':
    'Switch to the hosted Browser to access all of the latest features.',
  'start.hostedBrowser.button': "Let's go",

  // Graph Editing Guide
  'guide.graphEditing.title': 'Graph Editing Guide',
  'guide.graphEditing.identifier': 'graph-editing',
  'guide.s1.title': 'Graph Editing',
  'guide.s1.lead': 'Visual graph editing directly in the browser',
  'guide.s1.desc':
    'Neo4j Browser Editor lets you visually create, modify, and delete nodes and relationships without writing Cypher. All changes are tracked as pending edits and saved to the database in a single batch.',
  'guide.s1.li1': 'Click a node or relationship to inspect and edit',
  'guide.s1.li2': 'All edits are pending until you explicitly save',
  'guide.s1.li3': 'Review all changes in the Changes panel before saving',
  'guide.s2.title': 'Node Operations',
  'guide.s2.lead': 'Create, edit, and delete nodes',
  'guide.s2.createTitle': 'Create a node',
  'guide.s2.createDesc':
    'Right-click on the empty canvas area to create a new node at that position. The node appears with a default label which you can edit immediately in the right panel.',
  'guide.s2.labelsTitle': 'Edit labels',
  'guide.s2.labelsDesc':
    'Click a node to select it. In the right panel header, the current labels are shown as badges. Below them is a text input field with comma-separated labels. Edit the text and press Enter to confirm, or Esc to revert. A node must have at least one label.',
  'guide.s2.deleteTitle': 'Delete a node',
  'guide.s2.deleteDesc':
    'Click a node to select it. A ring menu appears around the node. Click the delete button on the ring (bottom-right) to remove the node and all its connected relationships.',
  'guide.s3.title': 'Property Editing',
  'guide.s3.lead': 'Modify properties on nodes and relationships',
  'guide.s3.editTitle': 'Edit a property',
  'guide.s3.editDesc':
    'Select a node or relationship. The right panel shows its properties table. Double-click on a key or value cell to enter inline edit mode. Press Enter to confirm or Esc to cancel.',
  'guide.s3.addTitle': 'Add a property',
  'guide.s3.addDesc':
    'At the bottom of the properties table, use the key and value input fields. Type a key and value, then press Enter or click the + button to add it.',
  'guide.s3.removeTitle': 'Remove a property',
  'guide.s3.removeDesc':
    'Click the trash icon at the right side of any property row to remove it. System properties (<id> and <elementId>) cannot be removed.',
  'guide.s3.validationTitle': 'Validation',
  'guide.s3.validationDesc':
    'Empty property keys and duplicate keys are rejected with a toast warning at the top-left of the canvas.',
  'guide.s4.title': 'Relationship Operations',
  'guide.s4.lead': 'Create, reverse, retype, reconnect, and delete',
  'guide.s4.createTitle': 'Create a relationship',
  'guide.s4.createDesc':
    'Click a node to select it. On the ring menu that appears, click the create relationship button. A toast message confirms relationship mode is active. Then click another node to connect them with a default type of RELATED_TO.',
  'guide.s4.typeTitle': 'Edit relationship type',
  'guide.s4.typeDesc':
    'Click a relationship to select it. In the right panel header, the type is shown as an editable text field. Type a new name and press Enter to confirm. An empty type defaults to RELATED_TO.',
  'guide.s4.reverseTitle': 'Reverse direction',
  'guide.s4.reverseDesc':
    'With a relationship selected, click the \u2194 button in the right panel header (next to the trash icon) to swap the source and target nodes.',
  'guide.s4.reconnectTitle': 'Reconnect endpoints',
  'guide.s4.reconnectDesc':
    'Right-click on the start or end circle of a relationship. A toast confirms reconnect mode. Then click a different node to reassign that endpoint.',
  'guide.s4.deleteTitle': 'Delete a relationship',
  'guide.s4.deleteDesc':
    'With a relationship selected, click the trash icon in the right panel header to mark it for deletion.',
  'guide.s5.title': 'Multi-Select & Batch Delete',
  'guide.s5.lead': 'Select multiple items with Shift+click',
  'guide.s5.desc1':
    'Hold Shift and click nodes or relationships to add or remove them from a multi-selection. Each Shift+click toggles that item. Selected items are highlighted on the canvas.',
  'guide.s5.desc2':
    'When two or more items are selected, the right panel shows a summary (number of nodes and relationships) with a Delete selected button. Clicking it marks all selected items for deletion.',
  'guide.s5.desc3':
    'A regular click (without Shift) clears the multi-selection and selects only the clicked item.',
  'guide.s6.title': 'Changes Panel',
  'guide.s6.lead': 'Review and manage pending changes',
  'guide.s6.desc':
    'Click the Changes tab in the result frame sidebar (clipboard icon). A red badge on the button shows the number of pending changes.',
  'guide.s6.categoriesTitle': 'Change categories',
  'guide.s6.createLabel': 'CREATE',
  'guide.s6.createDesc': 'newly created nodes or relationships',
  'guide.s6.deleteLabel': 'DELETE',
  'guide.s6.deleteDesc': 'items marked for deletion',
  'guide.s6.modifyLabel': 'LABELS / TYPE / REWIRE / PROPS',
  'guide.s6.modifyDesc': 'modified items',
  'guide.s6.saveTitle': 'Save & Cancel',
  'guide.s6.saveDesc':
    'Click Save All to commit every pending change to the database in a single transaction, or Cancel to discard all changes and reload the original data.',
  'guide.s6.revertDesc':
    'Edits that are reverted back to their original value are automatically removed from the pending list.',

  // Frame titlebar
  'frame.pin': 'Pin at top',
  'frame.expand': 'Expand',
  'frame.collapse': 'Collapse',
  'frame.fullscreen': 'Fullscreen',
  'frame.closeFullscreen': 'Close fullscreen',
  'frame.close': 'Close',

  // About page
  'about.title': 'About Neo4j',
  'about.madeBy': 'Made by',
  'about.copyright': 'Copyright',
  'about.youAreRunning': 'You are running',
  'about.browserVersion': 'Neo4j Browser version:',
  'about.serverVersion': 'Neo4j Server version:',
  'about.changelog': 'Neo4j Browser Changelog',
  'about.buildNumber': 'Build number:',
  'about.buildHash': 'Build hash:',
  'about.buildDate': 'Build date:',
  'about.license': 'License',
  'about.licenseDesc': 'for Open Source, and',
  'about.participate': 'Participate',
  'about.discussOn': 'Discuss on',
  'about.askQuestions': 'Ask questions at',
  'about.visitMeetup': 'Visit a local',
  'about.contributeCode': 'Contribute code to',
  'about.sendFeedback': 'Send us your Browser feedback via',
  'about.thanks': 'Thanks',
  'about.thanksDesc':
    "Neo4j wouldn't be possible without a fantastic community. Thanks for all the feedback, discussions and contributions.",
  'about.footer': 'With \u2665 from Sweden.',

  // Overview pane
  'overview.title': 'Overview',
  'overview.nodeLabels': 'Node labels',
  'overview.relTypes': 'Relationship types',
  'overview.showing': '(showing {visible} of {total})',
  'overview.truncatedFields': 'Record fields have been truncated.',
  'overview.displaying': 'Displaying {nodes} nodes, {rels} relationships.',

  // Default details pane
  'defaultDetails.nodeProperties': 'Node properties',
  'defaultDetails.relProperties': 'Relationship properties',
  'defaultDetails.copyAll': 'Copy all properties to clipboard',

  // Unfound guide
  'unfound.title': 'Not found',
  'unfound.desc':
    "Apologies, but there doesn't seem to be any content about that.",
  'unfound.try': 'Try:',
  'unfound.helpDesc': '- for general help about using Neo4j Browser',
  'unfound.guideDesc': '- to see a few available guides',
  'unfound.docsDesc': '- for detailed information about Neo4j',

  // Intro guide
  'intro.title': 'Intro Guide',
  'intro.s1.title': 'Navigating Neo4j Browser',
  'intro.s1.desc':
    'Neo4j Browser is a command-driven client as a web-based shell environment. It is perfect for running ad-hoc graph queries, with just enough ability to prototype a Neo4j-based application.',
  'intro.s1.li1': 'Developer focused.',
  'intro.s1.li2': 'Used for writing and running Cypher graph queries.',
  'intro.s1.li3': 'Exportable tabular results of any query result.',
  'intro.s1.li4':
    'Graph visualization of query results containing nodes and relationships.',
  'intro.s2.title': 'Browser Editor (a.k.a. Editor)',
  'intro.s2.lead': 'Edit and execute Cypher statements and Browser commands',
  'intro.s2.desc':
    'The Editor is the primary interface for entering and running Cypher statements and Browser commands. Browser commands begin with :, for example, :help.',
  'intro.s2.execute': 'Execute current command',
  'intro.s2.prevHistory': 'Previous command in history',
  'intro.s2.nextHistory': 'Next command in history',
  'intro.s2.keybindingHint':
    'You can view the list of keybinding anytime by running :help keys or by pressing F1 in the Editor to see all Editor-specific keybindings.',
  'intro.s3.title': 'Result frame',
  'intro.s3.lead': 'Most recently executed command or Cypher query',
  'intro.s3.desc':
    'A result frame is created for each execution and added to the top of the stream to create a scrollable collection in reverse chronological order.',
  'intro.s3.li1': 'A pinned frame always stays in the same position.',
  'intro.s3.li2':
    'You can clear the stream of result frames by running the :clear command.',
  'intro.s3.li3':
    'The maximum number of result frames displayed in the stream is 30. You can change this number in the Browser Settings drawer.',
  'intro.s3.li4':
    'You can bring up the history of the executed commands and queries by running the :history command.',
  'intro.s4.title': 'Reusable frame',
  'intro.s4.lead': 'Amend your query in place',
  'intro.s4.desc1':
    'You can also iterate in the same frame instead of generating a scrollable stream of frames.',
  'intro.s4.desc2':
    'Each reusable frame maintains its own local history of commands and updates the main one in the Editor, should you need to instantiate a new result frame from there.',
  'intro.s5.title': 'Sidebar: Database',
  'intro.s5.lead': 'Database information',
  'intro.s5.desc':
    'When Neo4j is installed, it is initiated with two databases \u2013 a system database and a default neo4j database. Launching Neo4j Browser automatically points you to the neo4j database, shown by the neo4j$ prompt in the Editor.',
  'intro.s6.title': 'Sidebar: Favorites',
  'intro.s6.lead': 'Quick way to save your queries',
  'intro.s6.desc1':
    'Favorite queries or commands can be saved in the local storage and displayed in the sidebar.',
  'intro.s6.desc2':
    'Favorites are global and independent of project or database, which means that you can access your Favorites from Neo4j Browser with different databases, hosting platforms, and data sets.',
  'intro.s7.title': 'Sidebar: Project files',
  'intro.s7.lead': 'Save cypher files to share with your colleagues',
  'intro.s7.desc1':
    'Project files allows you to save queries, guides, and other scripts, as Cypher files. Unlike favorites, which are saved in your local browser storage, project files are project-specific and are actual files stored in the project directory on your hard drive. All saved files are listed under the project they refer to.',
  'intro.s7.desc2': 'The Project Files drawer is Neo4j Desktop specific.',
  'intro.s8.title': 'Next steps',
  'intro.s8.conceptsLink': 'Concepts Guide - Learn about Neo4j property graphs',
  'intro.s8.cypherLink': 'Cypher Guide - Learn Cypher basics',
  'intro.s8.references': 'References',
  'intro.s8.helpCommands': 'Help commands - Useful Neo4j Browser commands',
  'intro.s8.helpKeys': 'Help keys - Keyboard shortcuts',

  // Concepts guide
  'concepts.title': 'Concepts Guide',
  'concepts.s1.title': 'Property graph model concepts',
  'concepts.s1.lead': 'Basic concepts to get you going',
  'concepts.s1.desc':
    'A graph database can store any kind of data using a few basic concepts:',
  'concepts.s1.li1': 'Nodes - represent entities of a domain.',
  'concepts.s1.li2': 'Labels - shape the domain by grouping nodes into sets.',
  'concepts.s1.li3': 'Relationships - connect two nodes.',
  'concepts.s1.li4':
    'Properties - named values that add qualities to nodes and relationships.',
  'concepts.s2.title': 'Nodes',
  'concepts.s2.lead': 'Neo4j stores data in a graph as nodes',
  'concepts.s2.desc':
    "The simplest graph has just a single node with some named values called properties. For example, let's draw a social graph:",
  'concepts.s2.li1': 'Draw a circle for a node.',
  'concepts.s2.li2': 'Add the name Emil.',
  'concepts.s2.li3': 'Note that he is from Sweden.',
  'concepts.s2.keyInfo': 'Key info:',
  'concepts.s2.ki1':
    'Nodes often represents entities or discrete objects that can be classified with zero or more labels.',
  'concepts.s2.ki2': 'Data is stored as properties of the nodes.',
  'concepts.s2.ki3': 'Properties are simple key-value pairs.',
  'concepts.s3.title': 'Labels',
  'concepts.s3.lead': 'Associate a set of nodes',
  'concepts.s3.desc':
    'Nodes can be grouped together by applying a Label to each member. In this social graph, you label each node that represents a Person.',
  'concepts.s3.li1': 'Add the label "Person" to the node you created for Emil.',
  'concepts.s3.li2': 'Color the "Person" node red.',
  'concepts.s3.keyInfo': 'Key info:',
  'concepts.s3.ki1': 'A node can have zero or more labels.',
  'concepts.s3.ki2': 'Labels are used to classify nodes.',
  'concepts.s4.title': 'More Nodes',
  'concepts.s4.lead': 'Neo4j is schema-free',
  'concepts.s4.desc':
    'Like any database, storing data in Neo4j can be as simple as adding more nodes. Nodes can have a mix of common and unique properties. Add a few more nodes and properties:',
  'concepts.s4.li1': 'Emil, Klout score of 99.',
  'concepts.s4.li2': 'Johan, from Sweden, who is learning to surf.',
  'concepts.s4.li3': 'Ian, from England, who is an author.',
  'concepts.s4.li4': 'Rik, from Belgium, who has a cat named Orval.',
  'concepts.s4.li5': 'Allison, from the US, who surfs.',
  'concepts.s4.keyInfo': 'Key info:',
  'concepts.s4.ki1': 'Similar nodes can have different properties.',
  'concepts.s4.ki2':
    'Properties can hold different data types, such as `number`, `string`, or `boolean`.',
  'concepts.s4.ki3':
    'Properties can also be a homogeneous list (array) containing strings, numbers, or boolean values.',
  'concepts.s4.ki4': 'Neo4j can store billions of nodes.',
  'concepts.s5.title': 'Relationships',
  'concepts.s5.lead': 'Connect the nodes',
  'concepts.s5.desc1':
    'The real power of Neo4j is in connected data. To associate any two nodes, add a relationship that describes how the records are related.',
  'concepts.s5.desc2':
    'In our social graph, you can simply say who knows (relationship type KNOWS) whom:',
  'concepts.s5.li1': 'Emil knows Johan and Ian.',
  'concepts.s5.li2': 'Johan knows Ian and Rik.',
  'concepts.s5.li3': 'Rik and Ian know Allison.',
  'concepts.s5.keyInfo': 'Key info:',
  'concepts.s5.ki1': 'Relationships always have a direction.',
  'concepts.s5.ki2': 'Relationships always have a type.',
  'concepts.s5.ki3':
    'Relationships form patterns of data, the structure of the graph.',
  'concepts.s6.title': 'Relationship properties',
  'concepts.s6.lead': 'Store information shared by two nodes',
  'concepts.s6.desc':
    "In a property graph, relationships can also contain properties that describe the relationship. Looking more closely at Emil's relationships, note that:",
  'concepts.s6.li1': 'Emil has known Johan since 2001.',
  'concepts.s6.li2': 'Emil rates Ian 5 (out of 5).',
  'concepts.s6.li3': 'Everyone else can have similar relationship properties.',
  'concepts.s7.title': 'Next steps',
  'concepts.s7.cypherLink': 'Cypher Guide - Learn Cypher basics',

  // Cypher guide
  'cypher.title': 'Cypher Guide',
  'cypher.s1.lead': "Neo4j's graph query language",
  'cypher.s1.desc':
    "Neo4j's Cypher language is purpose-built for working with graph data.",
  'cypher.s1.li1': 'Uses patterns to describe graph data.',
  'cypher.s1.li2': 'Familiar SQL-like clauses.',
  'cypher.s1.li3': 'Declarative, describing what to find, not how to find it.',
  'cypher.s2.title': 'CREATE',
  'cypher.s2.lead': 'Create a node',
  'cypher.s2.desc': "Let's use Cypher to generate a small social graph.",
  'cypher.s2.note': 'This guide assumes that you use an empty graph.',
  'cypher.s2.clickCode': 'Click this code block and bring it into the Editor:',
  'cypher.s2.createExplain': 'CREATE creates the node.',
  'cypher.s2.parenExplain': '() indicates the node.',
  'cypher.s2.varExplain':
    'ee:Person \u2013 ee is the node variable and Person is the node label.',
  'cypher.s2.propsExplain':
    '{} contains the properties that describe the node.',
  'cypher.s2.runButton': 'Run the Cypher code by clicking the Run button.',
  'cypher.s3.title': 'MATCH',
  'cypher.s3.lead': 'Find nodes',
  'cypher.s3.desc': 'Now, find the node representing Emil.',
  'cypher.s3.clickCode': 'Click this code block and bring it into the Editor:',
  'cypher.s3.matchExplain':
    'MATCH specifies a pattern of nodes and relationships.',
  'cypher.s3.patternExplain':
    '(ee:Person) is a single node pattern with label Person. It assigns matches to the variable ee.',
  'cypher.s3.whereExplain': 'WHERE filters the query.',
  'cypher.s3.compareExplain':
    "ee.name = 'Emil' compares name property to the value Emil.",
  'cypher.s3.returnExplain': 'RETURN returns particular results.',
  'cypher.s3.runButton': 'Run the Cypher code by clicking the Run button.',
  'cypher.s4.title': 'CREATE more data',
  'cypher.s4.lead': 'Nodes and relationships',
  'cypher.s4.desc':
    'The CREATE clause can create many nodes and relationships at once.',
  'cypher.s5.title': 'MATCH patterns',
  'cypher.s5.lead': 'Describe what to find in the graph',
  'cypher.s5.desc':
    "For instance, a pattern can be used to find Emil's friends:",
  'cypher.s5.matchExplain':
    'describes what nodes will be retrieved based upon the pattern.',
  'cypher.s5.eeExplain':
    'is the node reference that will be returned based upon the WHERE clause.',
  'cypher.s5.knowsExplain':
    'matches the KNOWS relationships (in either direction) from ee.',
  'cypher.s5.friendsExplain': "represents the nodes that are Emil's friends.",
  'cypher.s5.returnExplain':
    'returns the node, referenced here by (ee), and the related (friends) nodes found.',
  'cypher.s6.title': 'Next steps',
  'cypher.s6.movieLink':
    'The Movie Graph \u2013 Queries and recommendations with Cypher - movie use case.',
  'cypher.s6.northwindLink':
    'The Northwind Graph \u2013 Translate and import relation data into graph.',
  'cypher.s6.references': 'References',
  'cypher.s6.helpCommands': 'Help commands - Useful Neo4j Browser commands',
  'cypher.s6.helpKeys': 'Help keys - Keyboard shortcuts',

  // Movie graph guide
  'movie.title': 'Movie Graph Guide',
  'movie.s1.desc':
    'The Movie Graph is a mini graph application, containing actors and directors that are related through the movies they have collaborated on.',
  'movie.s1.showHow': 'This guide shows how to:',
  'movie.s1.load': 'Load: Insert movie data into the graph.',
  'movie.s1.constrain': 'Constrain: Create unique node property constraints.',
  'movie.s1.index': 'Index: Index nodes based on their labels.',
  'movie.s1.find': 'Find: Retrieve individual movies and actors.',
  'movie.s1.query': 'Query: Discover related actors and directors.',
  'movie.s1.solve': 'Solve: The Bacon Path.',
  'movie.s2.title': 'Create',
  'movie.s2.lead': 'Create the movie graph',
  'movie.s2.desc':
    'Use the following code block to create the movie graph. It contains a single Cypher query statement composed of multiple CREATE clauses.',
  'movie.s2.note':
    'This guide assumes that you use an empty graph. If it contains data, see page 9 on how to clean it up.',
  'movie.s2.clickCode': 'Click this code block and bring it into the Editor:',
  'movie.s2.runButton': 'Run the Cypher code by clicking the Run button.',
  'movie.s2.wait': 'Wait for the operation to finish.',
  'movie.s3.title': 'Create constraints',
  'movie.s3.lead': 'Unique node property constraints',
  'movie.s3.desc':
    'Create unique node property constraints to ensure that property values are unique for all nodes with a specific label. Adding the unique constraint, implicitly adds an index on that property.',
  'movie.s4.title': 'Index nodes',
  'movie.s4.lead':
    'Create indexes on one or more properties for all nodes that have a given label. Indexes are used to increase search performance.',
  'movie.s5.title': 'Find',
  'movie.s5.lead': 'Find individual nodes',
  'movie.s5.li1': 'Run any of the following query examples.',
  'movie.s5.li2': 'Notice the syntax pattern.',
  'movie.s5.li3': 'Try looking for other movies or actors.',
  'movie.s5.findTom': 'Find the actor named "Tom Hanks":',
  'movie.s5.findCloud': 'Find the movie with title "Cloud Atlas":',
  'movie.s5.find10': 'Find 10 people and return their names:',
  'movie.s5.find90s':
    'Find movies released in the 1990s and return their titles.',
  'movie.s6.title': 'Query',
  'movie.s6.lead': 'Find patterns',
  'movie.s6.desc':
    'Use the type of the relationship to find patterns within the graph, for example, ACTED_IN or DIRECTED. What other relationships exist?',
  'movie.s6.q1': 'What movies did Tom Hanks act in?',
  'movie.s6.q2': 'Who directed "Cloud Atlas"?',
  'movie.s6.q3': "Who were Tom Hanks' co-actors?",
  'movie.s6.q4': 'How people are related to "Cloud Atlas"?',
  'movie.s7.title': 'Solve',
  'movie.s7.lead': 'Six Degrees of Kevin Bacon',
  'movie.s7.desc':
    'You might have heard of the classic "Six Degrees of Kevin Bacon". That is simply the shortest path between two nodes, called the "Bacon Path".',
  'movie.s7.q1desc':
    'Use variable length patterns to find movies and actors up to 4 "hops" away from Kevin Bacon.',
  'movie.s7.q2desc':
    'Use the built-in shortestPath() algorithm to find the "Bacon Path" to Meg Ryan.',
  'movie.s8.title': 'Recommend',
  'movie.s8.lead': 'Recommend new co-actors',
  'movie.s8.desc':
    "Let's recommend new co-actors for Tom Hanks. A basic recommendation approach is to find connections past an immediate neighborhood that are themselves well connected.",
  'movie.s8.forTom': 'For Tom Hanks, that means:',
  'movie.s8.li1':
    'Extend Tom Hanks co-actors to find co-co-actors who have not worked with Tom Hanks.',
  'movie.s8.li2':
    'Find someone who can introduce Tom Hanks to his potential co-actor, in this case Tom Cruise.',
  'movie.s9.title': 'Clean up',
  'movie.s9.lead': 'Remove the movie data set',
  'movie.s9.desc':
    'When you are done experimenting, you can clean up your graph.',
  'movie.s9.note':
    'Nodes cannot be deleted if they have relationships, so you need to detach the nodes to delete them.',
  'movie.s9.li1': 'Delete all Movie and Person nodes, and their relationships.',
  'movie.s9.li2': 'Verify that the Movie Graph has been removed.',
  'movie.s10.title': 'Next steps',
  'movie.s10.northwindLink': 'Northwind Graph \u2013 from RDBMS to graph.',
  'movie.s10.gistLink': 'Explore more guides: Graph Gists Portal',
  'movie.s10.docsTitle': 'Documentation',

  // Northwind graph guide
  'northwind.title': 'Northwind Graph Guide',
  'northwind.s1.lead': 'From RDBMS to Graph using a classic dataset',
  'northwind.s1.desc':
    'The Northwind Graph demonstrates how to migrate from a relational database to Neo4j. The transformation is iterative and deliberate, emphasizing the conceptual shift from relational tables to nodes and relationships.',
  'northwind.s1.showHow': 'This guide shows how to:',
  'northwind.s1.load': 'Load: Load data from external CSV files.',
  'northwind.s1.index': 'Index: Index nodes based on their labels.',
  'northwind.s1.relate':
    'Relate: Transform foreign key references into data relationships.',
  'northwind.s1.promote': 'Promote: Transform join records into relationships.',
  'northwind.s2.title': 'Load product catalog',
  'northwind.s2.lead': 'Load the product catalog data from external CSV files',
  'northwind.s2.desc':
    "Northwind sells food products in a few categories provided by suppliers. Let's start by loading the product catalog tables.",
  'northwind.s2.csvNote':
    'The load statements to the right require public internet access. LOAD CSV retrieves a CSV file from a valid URL by applying a Cypher statement to each row using a named map. This example uses the name row.',
  'northwind.s2.loadProduct': 'Load product data.',
  'northwind.s2.loadCategory': 'Load category data.',
  'northwind.s2.loadSupplier': 'Load supplier data.',
  'northwind.s3.title': 'Index product catalog data',
  'northwind.s3.lead': 'Create node indexes based on labels',
  'northwind.s4.title': 'Relate product catalog data',
  'northwind.s4.lead':
    'Transform foreign key references into data relationships',
  'northwind.s4.desc':
    "The products, categories, and suppliers are related through foreign key references. Let's promote those to data relationships to realize the graph.",
  'northwind.s5.title': 'Query product data',
  'northwind.s5.lead': 'Query patterns',
  'northwind.s5.desc': 'Lets try some queries using patterns.',
  'northwind.s5.q1': 'What categories of food does each supplier supply?',
  'northwind.s5.q2': 'Find the produce suppliers.',
  'northwind.s6.title': 'Load customer orders',
  'northwind.s6.lead': 'Load customer orders data from external CSV files',
  'northwind.s6.desc':
    'Northwind customers place orders, which may detail multiple products.',
  'northwind.s6.loadCustomer': 'Load customer data.',
  'northwind.s6.loadOrder': 'Load order data.',
  'northwind.s7.title': 'Index customer orders data',
  'northwind.s7.lead': 'Create node indexes based on label',
  'northwind.s8.title': 'Relate customer orders data',
  'northwind.s8.lead': 'Create relationships between customers and orders',
  'northwind.s9.title': 'Promote customer orders data',
  'northwind.s9.lead': 'Transform join records into relationships',
  'northwind.s9.desc':
    'Notice that Order Details are always part of an order and that they relate the Order to a Product \u2014 they are a join table. Join tables are always a sign of a data relationship, indicating shared information between two other records.',
  'northwind.s9.promote':
    'Here, you directly promote each OrderDetail record into a relationship in the graph.',
  'northwind.s10.title': 'Query the Northwind graph',
  'northwind.s10.lead': 'Query patterns',
  'northwind.s10.desc': 'How many products did each customer purchase?',
  'northwind.s11.title': 'Reference'
}

const ko: TranslationStrings = {
  // Settings UI
  'settings.title': '\uBE0C\uB77C\uC6B0\uC800 \uC124\uC815',
  'settings.ui': '\uC0AC\uC6A9\uC790 \uC778\uD130\uD398\uC774\uC2A4',
  'settings.ui.theme': '\uD14C\uB9C8',
  'settings.ui.theme.tooltip':
    '"Auto"\uB97C \uC120\uD0DD\uD558\uBA74 \uC2DC\uC2A4\uD15C\uC758 \uB2E4\uD06C/\uB77C\uC774\uD2B8 \uBAA8\uB4DC\uB97C \uC790\uB3D9\uC73C\uB85C \uAC10\uC9C0\uD569\uB2C8\uB2E4.',
  'settings.ui.language': '\uC5B8\uC5B4',
  'settings.ui.language.tooltip':
    '\uBE0C\uB77C\uC6B0\uC800 \uC778\uD130\uD398\uC774\uC2A4\uC758 \uD45C\uC2DC \uC5B8\uC5B4\uB97C \uC120\uD0DD\uD569\uB2C8\uB2E4.',
  'settings.ui.codeFontLigatures': '\uCF54\uB4DC \uD3F0\uD2B8 \uD569\uC790',
  'settings.ui.codeFontLigatures.tooltip':
    '\uBA85\uB839 \uBC14\uC640 Cypher \uC2A4\uB2C8\uD3AB\uC5D0 \uD3F0\uD2B8 \uD569\uC790\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4',
  'settings.ui.enableMultiStatementMode':
    '\uB2E4\uC911 \uCFFC\uB9AC \uD3B8\uC9D1\uAE30 \uD65C\uC131\uD654',
  'settings.ui.enableMultiStatementMode.tooltip':
    '\uCFFC\uB9AC \uD3B8\uC9D1\uAE30\uC5D0\uC11C \uC5EC\uB7EC \uBB38\uC7A5\uC744 \uC2E4\uD589\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4',

  'settings.preferences': '\uD658\uACBD\uC124\uC815',
  'settings.preferences.initCmd': '\uCD08\uAE30 \uC2E4\uD589 \uBA85\uB839',
  'settings.preferences.initCmd.tooltip':
    '\uADF8\uB798\uD504\uC5D0 \uC5F0\uACB0\uB418\uBA74 \uC2E4\uD589\uB418\uB294 \uBA85\uB839\uC785\uB2C8\uB2E4.',
  'settings.preferences.connectionTimeout':
    '\uC5F0\uACB0 \uD0C0\uC784\uC544\uC6C3 (ms)',
  'settings.preferences.connectionTimeout.tooltip':
    'Neo4j\uC5D0 \uC5F0\uACB0\uD560 \uB54C\uC758 \uD0C0\uC784\uC544\uC6C3 \uC2DC\uAC04 (\uBC00\uB9AC\uCD08).',
  'settings.preferences.useReadTransactions':
    'Cypher \uCFFC\uB9AC\uC5D0 \uC77D\uAE30 \uD2B8\uB79C\uC7AD\uC158 \uC0AC\uC6A9',
  'settings.preferences.useReadTransactions.tooltip':
    '\uD074\uB7EC\uC2A4\uD130 \uD658\uACBD\uC5D0\uC11C \uC77D\uAE30 \uCFFC\uB9AC\uB97C \uBCF4\uC870 \uC11C\uBC84\uB85C \uBCF4\uB0B4\uB824\uBA74 \uC774 \uC124\uC815\uC744 \uC0AC\uC6A9\uD558\uC138\uC694.',

  'settings.resultFrames': '\uACB0\uACFC \uD504\uB808\uC784',
  'settings.resultFrames.maxFrames':
    '\uCD5C\uB300 \uACB0\uACFC \uD504\uB808\uC784 \uC218',
  'settings.resultFrames.maxFrames.tooltip':
    '\uCD5C\uB300 \uACB0\uACFC \uD504\uB808\uC784 \uC218. \uCD08\uACFC \uC2DC \uC624\uB798\uB41C \uD504\uB808\uC784\uC774 \uC81C\uAC70\uB429\uB2C8\uB2E4.',
  'settings.resultFrames.maxHistory':
    '\uCD5C\uB300 \uD788\uC2A4\uD1A0\uB9AC \uAE38\uC774',
  'settings.resultFrames.maxHistory.tooltip':
    '\uCD5C\uB300 \uD788\uC2A4\uD1A0\uB9AC \uD56D\uBAA9 \uC218. \uCD08\uACFC \uC2DC \uC624\uB798\uB41C \uD56D\uBAA9\uC774 \uC81C\uAC70\uB429\uB2C8\uB2E4.',
  'settings.resultFrames.scrollToTop':
    '\uD504\uB808\uC784 \uCD94\uAC00 \uC2DC \uB9E8 \uC704\uB85C \uC2A4\uD06C\uB864',
  'settings.resultFrames.scrollToTop.tooltip':
    '\uC0C8 \uD504\uB808\uC784 \uCD94\uAC00 \uC2DC \uC2A4\uD2B8\uB9BC\uC744 \uC790\uB3D9\uC73C\uB85C \uB9E8 \uC704\uB85C \uC2A4\uD06C\uB864\uD569\uB2C8\uB2E4.',

  'settings.graphViz': '\uADF8\uB798\uD504 \uC2DC\uAC01\uD654',
  'settings.graphViz.initialNodeDisplay':
    '\uCD08\uAE30 \uB178\uB4DC \uD45C\uC2DC \uC218',
  'settings.graphViz.initialNodeDisplay.tooltip':
    '\uADF8\uB798\uD504 \uC2DC\uAC01\uD654 \uCCAB \uB85C\uB4DC \uC2DC \uD45C\uC2DC\uD560 \uB178\uB4DC \uC218\uB97C \uC81C\uD55C\uD569\uB2C8\uB2E4.',
  'settings.graphViz.maxNeighbours':
    '\uC2DC\uAC01\uD654 \uD0D0\uC0C9 \uCD5C\uB300 \uC774\uC6C3 \uC218',
  'settings.graphViz.maxNeighbours.tooltip':
    '\uD0D0\uC0C9 \uCFFC\uB9AC\uB97C \uC774 \uC218\uB85C \uC81C\uD55C\uD569\uB2C8\uB2E4.',
  'settings.graphViz.maxRows': '\uACB0\uACFC \uBDF0 \uCD5C\uB300 \uD589 \uC218',
  'settings.graphViz.maxRows.tooltip':
    "'\uD589(Rows)' \uACB0\uACFC \uBDF0\uC5D0\uC11C \uB80C\uB354\uB9C1\uD560 \uCD5C\uB300 \uD589 \uC218",
  'settings.graphViz.maxFieldItems':
    '\uCD5C\uB300 \uB808\uCF54\uB4DC \uD544\uB4DC \uC218',
  'settings.graphViz.maxFieldItems.tooltip':
    '\uBC18\uD658\uB41C \uB808\uCF54\uB4DC\uB2F9 \uD544\uB4DC \uC218\uB97C \uC81C\uD55C\uD569\uB2C8\uB2E4',
  'settings.graphViz.autoComplete': '\uACB0\uACFC \uB178\uB4DC \uC5F0\uACB0',
  'settings.graphViz.autoComplete.tooltip':
    '\uCCB4\uD06C\uD558\uBA74 Cypher \uCFFC\uB9AC \uACB0\uACFC\uB97C \uAC00\uC838\uC628 \uD6C4, \uACB0\uACFC \uB178\uB4DC \uAC04\uC758 \uAD00\uACC4\uB97C \uAC00\uC838\uC624\uB294 \uCD94\uAC00 \uCFFC\uB9AC\uB97C \uC2E4\uD589\uD569\uB2C8\uB2E4.',
  'settings.graphViz.showWheelZoomInfo':
    '\uC90C \uC0C1\uD638\uC791\uC6A9 \uD78C\uD2B8 \uD45C\uC2DC',
  'settings.graphViz.showWheelZoomInfo.tooltip':
    '\uC2A4\uD06C\uB864 \uC0C1\uD638\uC791\uC6A9 \uD0A4\uBC14\uC778\uB529 \uD31D\uC5C5 \uC815\uBCF4 \uBE14\uB85D.',

  'settings.analytics': '\uC81C\uD488 \uBD84\uC11D',
  'settings.analytics.crashReports':
    '\uC775\uBA85 \uD06C\uB798\uC2DC \uB9AC\uD3EC\uD2B8 \uC804\uC1A1',
  'settings.analytics.crashReports.tooltip':
    '\uD06C\uB798\uC2DC \uB9AC\uD3EC\uD2B8\uB294 \uBB38\uC81C\uB97C \uBE60\uB974\uAC8C \uC9C4\uB2E8\uD558\uACE0 \uC218\uC815\uD558\uB294 \uB370 \uB3C4\uC6C0\uB429\uB2C8\uB2E4. \uAC1C\uC778 \uC815\uBCF4\uB294 \uC218\uC9D1/\uC804\uC1A1\uB418\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.',
  'settings.analytics.userStats':
    '\uC775\uBA85 \uC0AC\uC6A9 \uD1B5\uACC4 \uC804\uC1A1',
  'settings.analytics.userStats.tooltip':
    '\uC774 \uB370\uC774\uD130\uB294 \uAE30\uB2A5\uACFC \uAC1C\uC120 \uC0AC\uD56D\uC758 \uC6B0\uC120\uC21C\uC704\uB97C \uC815\uD558\uB294 \uB370 \uB3C4\uC6C0\uB429\uB2C8\uB2E4. \uAC1C\uC778 \uC815\uBCF4\uB294 \uC218\uC9D1/\uC804\uC1A1\uB418\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.',
  'settings.analytics.notLoaded':
    '\uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uC5F0\uACB0\uC774 \uC644\uC804\uD788 \uC124\uC815\uB418\uAE30 \uC804\uC5D0\uB294 \uC0AC\uC6A9 \uBD84\uC11D\uC774 \uBE44\uD65C\uC131\uD654\uB429\uB2C8\uB2E4.',
  'settings.experimentalFeatures': '\uC2E4\uD5D8\uC801 \uAE30\uB2A5',

  // Graph editing - toast
  'editing.toast.clickNodeToConnect':
    '\uB2E4\uB978 \uB178\uB4DC\uB97C \uD074\uB9AD\uD558\uC5EC \uAD00\uACC4\uB97C \uC0DD\uC131\uD558\uC138\uC694',
  'editing.toast.relationshipCreated':
    '\uAD00\uACC4\uAC00 \uC0DD\uC131\uB418\uC5C8\uC2B5\uB2C8\uB2E4',
  'editing.toast.clickNodeToReconnect':
    '\uB178\uB4DC\uB97C \uD074\uB9AD\uD558\uC5EC \uC7AC\uC5F0\uACB0\uD558\uC138\uC694',
  'editing.toast.reconnected':
    '\uAD00\uACC4\uAC00 \uC7AC\uC5F0\uACB0\uB418\uC5C8\uC2B5\uB2C8\uB2E4',
  'editing.toast.nodeCreated':
    '\uC0C8 \uB178\uB4DC\uAC00 \uC0DD\uC131\uB418\uC5C8\uC2B5\uB2C8\uB2E4',
  'editing.toast.batchDeleted':
    '\uAC1C \uD56D\uBAA9\uC774 \uC0AD\uC81C \uB300\uAE30 \uC0C1\uD0DC\uC785\uB2C8\uB2E4',
  'editing.toast.relModeEnabled':
    '\uAD00\uACC4 \uC0DD\uC131 \uBAA8\uB4DC \uD65C\uC131\uD654. \uB2E4\uB978 \uB178\uB4DC\uB97C \uD074\uB9AD\uD558\uC5EC \uC5F0\uACB0\uD558\uC138\uC694.',
  'editing.toast.reconnectSource':
    '\uC18C\uC2A4 \uC5D4\uB4DC\uD3EC\uC778\uD2B8 \uC7AC\uC5F0\uACB0: \uB178\uB4DC\uB97C \uD074\uB9AD\uD558\uC138\uC694.',
  'editing.toast.reconnectTarget':
    '\uB300\uC0C1 \uC5D4\uB4DC\uD3EC\uC778\uD2B8 \uC7AC\uC5F0\uACB0: \uB178\uB4DC\uB97C \uD074\uB9AD\uD558\uC138\uC694.',
  'editing.toast.saved':
    '\uBCC0\uACBD\uC0AC\uD56D\uC774 \uC800\uC7A5\uB418\uC5C8\uC2B5\uB2C8\uB2E4.',
  'editing.toast.saveFailed':
    '\uBCC0\uACBD\uC0AC\uD56D \uC800\uC7A5\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.',
  'editing.toast.selectTwoDifferentNodes':
    '\uAD00\uACC4\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC11C\uB85C \uB2E4\uB978 \uB450 \uB178\uB4DC\uB97C \uC120\uD0DD\uD558\uC138\uC694.',
  'editing.toast.saveNewNodesFirst':
    '\uC0C8\uB85C \uB9CC\uB4E0 \uB178\uB4DC\uB97C \uBA3C\uC800 \uC800\uC7A5\uD55C \uD6C4 \uAD00\uACC4\uB97C \uC0DD\uC131\uD558\uC138\uC694.',

  // Graph editing - validation
  'editing.validation.emptyLabel':
    '\uB178\uB4DC\uC5D0\uB294 \uCD5C\uC18C 1\uAC1C\uC758 \uB77C\uBCA8\uC774 \uD544\uC694\uD569\uB2C8\uB2E4',
  'editing.validation.emptyPropertyKey':
    '\uC18D\uC131 \uD0A4\uAC00 \uBE44\uC5B4\uC788\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4',
  'editing.validation.duplicatePropertyKey':
    '\uC911\uBCF5\uB41C \uC18D\uC131 \uD0A4',
  'editing.validation.emptyRelType':
    '\uAD00\uACC4 \uD0C0\uC785\uC774 \uBE44\uC5B4\uC788\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. RELATED_TO\uB85C \uAE30\uBCF8 \uC124\uC815\uB429\uB2C8\uB2E4',

  // Graph editing - multi-select panel
  'editing.panel.multiSelect.itemsSelected':
    '{count}\uAC1C \uD56D\uBAA9 \uC120\uD0DD\uB428',
  'editing.panel.multiSelect.nodes': '\uB178\uB4DC',
  'editing.panel.multiSelect.relationships': '\uAD00\uACC4',
  'editing.panel.multiSelect.deleteSelected':
    '\uC120\uD0DD \uD56D\uBAA9 \uC0AD\uC81C ({count})',
  'editing.panel.collapse':
    '\uB178\uB4DC \uC18D\uC131 \uD45C\uC2DC \uC811\uAE30',
  'editing.panel.expand':
    '\uB178\uB4DC \uC18D\uC131 \uD45C\uC2DC \uD3BC\uCE58\uAE30',

  // Graph editing - changes panel
  'editing.changes.title': '\uBCC0\uACBD\uC0AC\uD56D',
  'editing.changes.pendingChanges':
    '\uB300\uAE30 \uC911\uC778 \uBCC0\uACBD\uC0AC\uD56D ({count})',
  'editing.changes.saveAll': '\uBAA8\uB450 \uC800\uC7A5',
  'editing.changes.saving': '\uC800\uC7A5 \uC911...',
  'editing.changes.cancel': '\uCDE8\uC18C',
  'editing.changes.noChanges':
    '\uB300\uAE30 \uC911\uC778 \uBCC0\uACBD\uC0AC\uD56D \uC5C6\uC74C',
  'editing.changes.create': '\uC0DD\uC131',
  'editing.changes.delete': '\uC0AD\uC81C',
  'editing.changes.labels': '\uB77C\uBCA8',
  'editing.changes.type': '\uD0C0\uC785',
  'editing.changes.rewire': '\uC7AC\uC5F0\uACB0',
  'editing.changes.props': '\uC18D\uC131',
  'editing.changes.node': '\uB178\uB4DC',
  'editing.changes.rel': '\uAD00\uACC4',

  // Graph editing - details pane
  'editing.details.nodeProperties': '\uB178\uB4DC \uC18D\uC131',
  'editing.details.relationshipProperties': '\uAD00\uACC4 \uC18D\uC131',
  'editing.details.copyAll':
    '\uBAA8\uB4E0 \uC18D\uC131\uC744 \uD074\uB9BD\uBCF4\uB4DC\uC5D0 \uBCF5\uC0AC',
  'editing.details.relType': '\uAD00\uACC4 \uD0C0\uC785',
  'editing.details.relTypePlaceholder': 'RELATED_TO',
  'editing.details.reverseDirection': '\uBC29\uD5A5 \uC804\uD658',
  'editing.details.deleteRelationship': '\uAD00\uACC4 \uC0AD\uC81C',
  'editing.details.nodeLabels': '\uB178\uB4DC \uB77C\uBCA8',
  'editing.details.nodeLabelsPlaceholder':
    '\uB178\uB4DC \uB77C\uBCA8 (\uC274\uD45C\uB85C \uAD6C\uBD84)',

  // Graph editing - properties table
  'editing.props.showAll': ' \uBAA8\uB450 \uBCF4\uAE30',
  'editing.props.editKey': '\uC18D\uC131 \uD0A4 \uD3B8\uC9D1',
  'editing.props.editValue': '\uC18D\uC131 \uAC12 \uD3B8\uC9D1',
  'editing.props.removeProperty': '\uC18D\uC131 {key} \uC0AD\uC81C',
  'editing.props.copyKeyValue': '\uD0A4\uC640 \uAC12 \uBCF5\uC0AC',
  'editing.props.newKey': '\uC0C8 \uC18D\uC131 \uD0A4',
  'editing.props.newKeyPlaceholder': '\uD0A4',
  'editing.props.newValue': '\uC0C8 \uC18D\uC131 \uAC12',
  'editing.props.newValuePlaceholder': '\uAC12',
  'editing.props.addProperty': '\uC18D\uC131 \uCD94\uAC00',

  // StartPreviewFrame
  'start.graphEditing.title': '\uADF8\uB798\uD504 \uD3B8\uC9D1',
  'start.graphEditing.lead':
    '\uB178\uB4DC & \uAD00\uACC4\uB97C \uC2DC\uAC01\uC801\uC73C\uB85C \uD3B8\uC9D1',
  'start.graphEditing.bullet1':
    '\uCE94\uBC84\uC2A4 \uC6B0\uD074\uB9AD\uC73C\uB85C \uB178\uB4DC \uC0DD\uC131',
  'start.graphEditing.bullet2':
    '\uB9C1 \uBA54\uB274\uB85C \uC0AD\uC81C & \uC5F0\uACB0',
  'start.graphEditing.bullet3':
    '\uC778\uB77C\uC778 \uC18D\uC131 & \uB77C\uBCA8 \uD3B8\uC9D1',
  'start.graphEditing.openGuide': '\uAC00\uC774\uB4DC \uC5F4\uAE30',
  'start.tryNeo4j.title':
    '\uB77C\uC774\uBE0C \uB370\uC774\uD130\uB85C Neo4j \uCCB4\uD5D8',
  'start.tryNeo4j.lead':
    '\uC77C\uBC18\uC801\uC778 \uCFFC\uB9AC \uD328\uD134\uC744 \uBCF4\uC5EC\uC8FC\uB294 \uC644\uC804\uD55C \uC608\uC81C \uADF8\uB798\uD504\uC785\uB2C8\uB2E4.',
  'start.tryNeo4j.description':
    '\uC0C1\uD638 \uCC38\uC870\uB41C \uB300\uC911 \uBB38\uD654\uC758 \uBC30\uC6B0 & \uC601\uD654.',
  'start.hostedBrowser.title':
    '\uC0C8 \uD638\uC2A4\uD305 \uBE0C\uB77C\uC6B0\uC800\uB97C \uC0AC\uC6A9\uD574 \uBCF4\uC138\uC694!',
  'start.hostedBrowser.description':
    '\uD638\uC2A4\uD305 \uBE0C\uB77C\uC6B0\uC800\uB85C \uC804\uD658\uD558\uC5EC \uCD5C\uC2E0 \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD558\uC138\uC694.',
  'start.hostedBrowser.button': '\uC2DC\uC791\uD558\uAE30',

  // Graph Editing Guide
  'guide.graphEditing.title':
    '\uADF8\uB798\uD504 \uD3B8\uC9D1 \uAC00\uC774\uB4DC',
  'guide.graphEditing.identifier': 'graph-editing',
  'guide.s1.title': '\uADF8\uB798\uD504 \uD3B8\uC9D1',
  'guide.s1.lead':
    '\uBE0C\uB77C\uC6B0\uC800\uC5D0\uC11C \uC9C1\uC811 \uC2DC\uAC01\uC801 \uADF8\uB798\uD504 \uD3B8\uC9D1',
  'guide.s1.desc':
    'Neo4j Browser Editor\uB97C \uC0AC\uC6A9\uD558\uBA74 Cypher\uB97C \uC791\uC131\uD558\uC9C0 \uC54A\uACE0\uB3C4 \uC2DC\uAC01\uC801\uC73C\uB85C \uB178\uB4DC\uC640 \uAD00\uACC4\uB97C \uC0DD\uC131, \uC218\uC815, \uC0AD\uC81C\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uBAA8\uB4E0 \uBCC0\uACBD\uC0AC\uD56D\uC740 \uB300\uAE30 \uC911\uC778 \uD3B8\uC9D1\uC73C\uB85C \uCD94\uC801\uB418\uBA70 \uB2E8\uC77C \uBC30\uCE58\uB85C \uB370\uC774\uD130\uBCA0\uC774\uC2A4\uC5D0 \uC800\uC7A5\uB429\uB2C8\uB2E4.',
  'guide.s1.li1':
    '\uB178\uB4DC \uB610\uB294 \uAD00\uACC4\uB97C \uD074\uB9AD\uD558\uC5EC \uAC80\uC0AC\uD558\uACE0 \uD3B8\uC9D1',
  'guide.s1.li2':
    '\uBAA8\uB4E0 \uD3B8\uC9D1\uC740 \uBA85\uC2DC\uC801\uC73C\uB85C \uC800\uC7A5\uD560 \uB54C\uAE4C\uC9C0 \uB300\uAE30 \uC0C1\uD0DC',
  'guide.s1.li3':
    '\uC800\uC7A5 \uC804\uC5D0 \uBCC0\uACBD\uC0AC\uD56D \uD328\uB110\uC5D0\uC11C \uBAA8\uB4E0 \uBCC0\uACBD\uC0AC\uD56D \uAC80\uD1A0',
  'guide.s2.title': '\uB178\uB4DC \uC791\uC5C5',
  'guide.s2.lead': '\uB178\uB4DC \uC0DD\uC131, \uD3B8\uC9D1, \uC0AD\uC81C',
  'guide.s2.createTitle': '\uB178\uB4DC \uC0DD\uC131',
  'guide.s2.createDesc':
    '\uCE94\uBC84\uC2A4 \uBE48 \uC601\uC5ED\uC744 \uC6B0\uD074\uB9AD\uD558\uBA74 \uD574\uB2F9 \uC704\uCE58\uC5D0 \uC0C8 \uB178\uB4DC\uAC00 \uC0DD\uC131\uB429\uB2C8\uB2E4. \uB178\uB4DC\uB294 \uAE30\uBCF8 \uB77C\uBCA8\uB85C \uB098\uD0C0\uB098\uBA70 \uC624\uB978\uCABD \uD328\uB110\uC5D0\uC11C \uC989\uC2DC \uD3B8\uC9D1\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.',
  'guide.s2.labelsTitle': '\uB77C\uBCA8 \uD3B8\uC9D1',
  'guide.s2.labelsDesc':
    '\uB178\uB4DC\uB97C \uD074\uB9AD\uD558\uC5EC \uC120\uD0DD\uD569\uB2C8\uB2E4. \uC624\uB978\uCABD \uD328\uB110 \uD5E4\uB354\uC5D0 \uD604\uC7AC \uB77C\uBCA8\uC774 \uBC30\uC9C0\uB85C \uD45C\uC2DC\uB429\uB2C8\uB2E4. \uADF8 \uC544\uB798\uC5D0 \uC274\uD45C\uB85C \uAD6C\uBD84\uB41C \uB77C\uBCA8 \uD14D\uC2A4\uD2B8 \uC785\uB825 \uD544\uB4DC\uAC00 \uC788\uC2B5\uB2C8\uB2E4. \uD14D\uC2A4\uD2B8\uB97C \uD3B8\uC9D1\uD558\uACE0 Enter\uB97C \uB20C\uB7EC \uD655\uC778\uD558\uAC70\uB098 Esc\uB97C \uB20C\uB7EC \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uB178\uB4DC\uC5D0\uB294 \uCD5C\uC18C 1\uAC1C\uC758 \uB77C\uBCA8\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.',
  'guide.s2.deleteTitle': '\uB178\uB4DC \uC0AD\uC81C',
  'guide.s2.deleteDesc':
    '\uB178\uB4DC\uB97C \uD074\uB9AD\uD558\uC5EC \uC120\uD0DD\uD569\uB2C8\uB2E4. \uB178\uB4DC \uC8FC\uC704\uC5D0 \uB9C1 \uBA54\uB274\uAC00 \uB098\uD0C0\uB0A9\uB2C8\uB2E4. \uB9C1\uC758 \uC0AD\uC81C \uBC84\uD2BC(\uC6B0\uD558\uB2E8)\uC744 \uD074\uB9AD\uD558\uBA74 \uB178\uB4DC\uC640 \uC5F0\uACB0\uB41C \uBAA8\uB4E0 \uAD00\uACC4\uAC00 \uC81C\uAC70\uB429\uB2C8\uB2E4.',
  'guide.s3.title': '\uC18D\uC131 \uD3B8\uC9D1',
  'guide.s3.lead':
    '\uB178\uB4DC\uC640 \uAD00\uACC4\uC758 \uC18D\uC131 \uC218\uC815',
  'guide.s3.editTitle': '\uC18D\uC131 \uD3B8\uC9D1',
  'guide.s3.editDesc':
    '\uB178\uB4DC \uB610\uB294 \uAD00\uACC4\uB97C \uC120\uD0DD\uD569\uB2C8\uB2E4. \uC624\uB978\uCABD \uD328\uB110\uC5D0 \uC18D\uC131 \uD14C\uC774\uBE14\uC774 \uD45C\uC2DC\uB429\uB2C8\uB2E4. \uD0A4 \uB610\uB294 \uAC12 \uC140\uC744 \uB354\uBE14\uD074\uB9AD\uD558\uBA74 \uC778\uB77C\uC778 \uD3B8\uC9D1 \uBAA8\uB4DC\uB85C \uC9C4\uC785\uD569\uB2C8\uB2E4. Enter\uB97C \uB20C\uB7EC \uD655\uC778\uD558\uAC70\uB098 Esc\uB97C \uB20C\uB7EC \uCDE8\uC18C\uD569\uB2C8\uB2E4.',
  'guide.s3.addTitle': '\uC18D\uC131 \uCD94\uAC00',
  'guide.s3.addDesc':
    '\uC18D\uC131 \uD14C\uC774\uBE14 \uD558\uB2E8\uC758 \uD0A4\uC640 \uAC12 \uC785\uB825 \uD544\uB4DC\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4. \uD0A4\uC640 \uAC12\uC744 \uC785\uB825\uD55C \uD6C4 Enter\uB97C \uB204\uB974\uAC70\uB098 + \uBC84\uD2BC\uC744 \uD074\uB9AD\uD558\uC5EC \uCD94\uAC00\uD569\uB2C8\uB2E4.',
  'guide.s3.removeTitle': '\uC18D\uC131 \uC0AD\uC81C',
  'guide.s3.removeDesc':
    '\uC18D\uC131 \uD589 \uC6B0\uCE21\uC758 \uD734\uC9C0\uD1B5 \uC544\uC774\uCF58\uC744 \uD074\uB9AD\uD558\uC5EC \uC0AD\uC81C\uD569\uB2C8\uB2E4. \uC2DC\uC2A4\uD15C \uC18D\uC131(<id>, <elementId>)\uC740 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.',
  'guide.s3.validationTitle': '\uC720\uD6A8\uC131 \uAC80\uC0AC',
  'guide.s3.validationDesc':
    '\uBE48 \uC18D\uC131 \uD0A4\uC640 \uC911\uBCF5 \uD0A4\uB294 \uCE94\uBC84\uC2A4 \uC88C\uC0C1\uB2E8\uC758 \uD1A0\uC2A4\uD2B8 \uACBD\uACE0\uB85C \uAC70\uBD80\uB429\uB2C8\uB2E4.',
  'guide.s4.title': '\uAD00\uACC4 \uC791\uC5C5',
  'guide.s4.lead':
    '\uC0DD\uC131, \uBC29\uD5A5 \uC804\uD658, \uD0C0\uC785 \uBCC0\uACBD, \uC7AC\uC5F0\uACB0, \uC0AD\uC81C',
  'guide.s4.createTitle': '\uAD00\uACC4 \uC0DD\uC131',
  'guide.s4.createDesc':
    '\uB178\uB4DC\uB97C \uD074\uB9AD\uD558\uC5EC \uC120\uD0DD\uD569\uB2C8\uB2E4. \uB098\uD0C0\uB098\uB294 \uB9C1 \uBA54\uB274\uC5D0\uC11C \uAD00\uACC4 \uC0DD\uC131 \uBC84\uD2BC\uC744 \uD074\uB9AD\uD569\uB2C8\uB2E4. \uD1A0\uC2A4\uD2B8 \uBA54\uC2DC\uC9C0\uAC00 \uAD00\uACC4 \uBAA8\uB4DC\uAC00 \uD65C\uC131\uD654\uB418\uC5C8\uC74C\uC744 \uD655\uC778\uD569\uB2C8\uB2E4. \uADF8\uB7F0 \uB2E4\uC74C \uB2E4\uB978 \uB178\uB4DC\uB97C \uD074\uB9AD\uD558\uBA74 \uAE30\uBCF8 \uD0C0\uC785 RELATED_TO\uB85C \uC5F0\uACB0\uB429\uB2C8\uB2E4.',
  'guide.s4.typeTitle': '\uAD00\uACC4 \uD0C0\uC785 \uD3B8\uC9D1',
  'guide.s4.typeDesc':
    '\uAD00\uACC4\uB97C \uD074\uB9AD\uD558\uC5EC \uC120\uD0DD\uD569\uB2C8\uB2E4. \uC624\uB978\uCABD \uD328\uB110 \uD5E4\uB354\uC5D0 \uD0C0\uC785\uC774 \uD3B8\uC9D1 \uAC00\uB2A5\uD55C \uD14D\uC2A4\uD2B8 \uD544\uB4DC\uB85C \uD45C\uC2DC\uB429\uB2C8\uB2E4. \uC0C8 \uC774\uB984\uC744 \uC785\uB825\uD558\uACE0 Enter\uB97C \uB20C\uB7EC \uD655\uC778\uD569\uB2C8\uB2E4. \uBE48 \uD0C0\uC785\uC740 RELATED_TO\uB85C \uAE30\uBCF8 \uC124\uC815\uB429\uB2C8\uB2E4.',
  'guide.s4.reverseTitle': '\uBC29\uD5A5 \uC804\uD658',
  'guide.s4.reverseDesc':
    '\uAD00\uACC4\uAC00 \uC120\uD0DD\uB41C \uC0C1\uD0DC\uC5D0\uC11C \uC624\uB978\uCABD \uD328\uB110 \uD5E4\uB354\uC758 \u2194 \uBC84\uD2BC(\uD734\uC9C0\uD1B5 \uC544\uC774\uCF58 \uC606)\uC744 \uD074\uB9AD\uD558\uBA74 \uC18C\uC2A4\uC640 \uB300\uC0C1 \uB178\uB4DC\uAC00 \uAD50\uD658\uB429\uB2C8\uB2E4.',
  'guide.s4.reconnectTitle':
    '\uC5D4\uB4DC\uD3EC\uC778\uD2B8 \uC7AC\uC5F0\uACB0',
  'guide.s4.reconnectDesc':
    '\uAD00\uACC4\uC758 \uC2DC\uC791 \uB610\uB294 \uB05D \uC6D0\uC744 \uC6B0\uD074\uB9AD\uD569\uB2C8\uB2E4. \uD1A0\uC2A4\uD2B8\uAC00 \uC7AC\uC5F0\uACB0 \uBAA8\uB4DC\uB97C \uD655\uC778\uD569\uB2C8\uB2E4. \uADF8\uB7F0 \uB2E4\uC74C \uB2E4\uB978 \uB178\uB4DC\uB97C \uD074\uB9AD\uD558\uC5EC \uD574\uB2F9 \uC5D4\uB4DC\uD3EC\uC778\uD2B8\uB97C \uC7AC\uBC30\uC815\uD569\uB2C8\uB2E4.',
  'guide.s4.deleteTitle': '\uAD00\uACC4 \uC0AD\uC81C',
  'guide.s4.deleteDesc':
    '\uAD00\uACC4\uAC00 \uC120\uD0DD\uB41C \uC0C1\uD0DC\uC5D0\uC11C \uC624\uB978\uCABD \uD328\uB110 \uD5E4\uB354\uC758 \uD734\uC9C0\uD1B5 \uC544\uC774\uCF58\uC744 \uD074\uB9AD\uD558\uBA74 \uC0AD\uC81C \uB300\uAE30 \uC0C1\uD0DC\uB85C \uD45C\uC2DC\uB429\uB2C8\uB2E4.',
  'guide.s5.title': '\uB2E4\uC911 \uC120\uD0DD & \uC77C\uAD04 \uC0AD\uC81C',
  'guide.s5.lead':
    'Shift+\uD074\uB9AD\uC73C\uB85C \uC5EC\uB7EC \uD56D\uBAA9 \uC120\uD0DD',
  'guide.s5.desc1':
    'Shift\uB97C \uB204\uB978 \uC0C1\uD0DC\uB85C \uB178\uB4DC \uB610\uB294 \uAD00\uACC4\uB97C \uD074\uB9AD\uD558\uBA74 \uB2E4\uC911 \uC120\uD0DD\uC5D0 \uCD94\uAC00\uD558\uAC70\uB098 \uC81C\uAC70\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uAC01 Shift+\uD074\uB9AD\uC740 \uD574\uB2F9 \uD56D\uBAA9\uC744 \uD1A0\uAE00\uD569\uB2C8\uB2E4. \uC120\uD0DD\uB41C \uD56D\uBAA9\uC740 \uCE94\uBC84\uC2A4\uC5D0\uC11C \uAC15\uC870 \uD45C\uC2DC\uB429\uB2C8\uB2E4.',
  'guide.s5.desc2':
    '\uB450 \uAC1C \uC774\uC0C1\uC758 \uD56D\uBAA9\uC774 \uC120\uD0DD\uB418\uBA74 \uC624\uB978\uCABD \uD328\uB110\uC5D0 \uC694\uC57D(\uB178\uB4DC \uBC0F \uAD00\uACC4 \uC218)\uACFC \uC120\uD0DD \uD56D\uBAA9 \uC0AD\uC81C \uBC84\uD2BC\uC774 \uD45C\uC2DC\uB429\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uBAA8\uB4E0 \uC120\uD0DD\uB41C \uD56D\uBAA9\uC774 \uC0AD\uC81C \uB300\uAE30 \uC0C1\uD0DC\uB85C \uD45C\uC2DC\uB429\uB2C8\uB2E4.',
  'guide.s5.desc3':
    '\uC77C\uBC18 \uD074\uB9AD(Shift \uC5C6\uC774)\uC740 \uB2E4\uC911 \uC120\uD0DD\uC744 \uD574\uC81C\uD558\uACE0 \uD074\uB9AD\uD55C \uD56D\uBAA9\uB9CC \uC120\uD0DD\uD569\uB2C8\uB2E4.',
  'guide.s6.title': '\uBCC0\uACBD\uC0AC\uD56D \uD328\uB110',
  'guide.s6.lead':
    '\uB300\uAE30 \uC911\uC778 \uBCC0\uACBD\uC0AC\uD56D \uAC80\uD1A0 \uBC0F \uAD00\uB9AC',
  'guide.s6.desc':
    '\uACB0\uACFC \uD504\uB808\uC784 \uC0AC\uC774\uB4DC\uBC14\uC758 \uBCC0\uACBD\uC0AC\uD56D \uD0ED(\uD074\uB9BD\uBCF4\uB4DC \uC544\uC774\uCF58)\uC744 \uD074\uB9AD\uD569\uB2C8\uB2E4. \uBC84\uD2BC\uC758 \uBE68\uAC04 \uBC30\uC9C0\uAC00 \uB300\uAE30 \uC911\uC778 \uBCC0\uACBD\uC0AC\uD56D \uC218\uB97C \uD45C\uC2DC\uD569\uB2C8\uB2E4.',
  'guide.s6.categoriesTitle': '\uBCC0\uACBD \uCE74\uD14C\uACE0\uB9AC',
  'guide.s6.createLabel': '\uC0DD\uC131',
  'guide.s6.createDesc':
    '\uC0C8\uB85C \uB9CC\uB4E0 \uB178\uB4DC \uB610\uB294 \uAD00\uACC4',
  'guide.s6.deleteLabel': '\uC0AD\uC81C',
  'guide.s6.deleteDesc': '\uC0AD\uC81C \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9',
  'guide.s6.modifyLabel':
    '\uB77C\uBCA8 / \uD0C0\uC785 / \uC7AC\uC5F0\uACB0 / \uC18D\uC131',
  'guide.s6.modifyDesc': '\uC218\uC815\uB41C \uD56D\uBAA9',
  'guide.s6.saveTitle': '\uC800\uC7A5 & \uCDE8\uC18C',
  'guide.s6.saveDesc':
    '\uBAA8\uB450 \uC800\uC7A5\uC744 \uD074\uB9AD\uD558\uBA74 \uBAA8\uB4E0 \uB300\uAE30 \uC911\uC778 \uBCC0\uACBD\uC0AC\uD56D\uC774 \uB2E8\uC77C \uD2B8\uB79C\uC7AD\uC158\uC73C\uB85C \uB370\uC774\uD130\uBCA0\uC774\uC2A4\uC5D0 \uCEE4\uBC0B\uB429\uB2C8\uB2E4. \uCDE8\uC18C\uB97C \uD074\uB9AD\uD558\uBA74 \uBAA8\uB4E0 \uBCC0\uACBD\uC0AC\uD56D\uC744 \uD3D0\uAE30\uD558\uACE0 \uC6D0\uBCF8 \uB370\uC774\uD130\uB97C \uB2E4\uC2DC \uB85C\uB4DC\uD569\uB2C8\uB2E4.',
  'guide.s6.revertDesc':
    '\uC6D0\uB798 \uAC12\uC73C\uB85C \uB418\uB3CC\uB9B0 \uD3B8\uC9D1\uC740 \uB300\uAE30 \uBAA9\uB85D\uC5D0\uC11C \uC790\uB3D9\uC73C\uB85C \uC81C\uAC70\uB429\uB2C8\uB2E4.',

  // Frame titlebar
  'frame.pin': '\uC0C1\uB2E8\uC5D0 \uACE0\uC815',
  'frame.expand': '\uD3BC\uCE58\uAE30',
  'frame.collapse': '\uC811\uAE30',
  'frame.fullscreen': '\uC804\uCCB4 \uD654\uBA74',
  'frame.closeFullscreen': '\uC804\uCCB4 \uD654\uBA74 \uB2EB\uAE30',
  'frame.close': '\uB2EB\uAE30',

  // About page
  'about.title': 'Neo4j \uC815\uBCF4',
  'about.madeBy': '\uC81C\uC791',
  'about.copyright': '\uC800\uC791\uAD8C',
  'about.youAreRunning': '\uD604\uC7AC \uC2E4\uD589 \uC911',
  'about.browserVersion': 'Neo4j Browser \uBC84\uC804:',
  'about.serverVersion': 'Neo4j Server \uBC84\uC804:',
  'about.changelog': 'Neo4j Browser \uBCC0\uACBD \uC774\uB825',
  'about.buildNumber': '\uBE4C\uB4DC \uBC88\uD638:',
  'about.buildHash': '\uBE4C\uB4DC \uD574\uC2DC:',
  'about.buildDate': '\uBE4C\uB4DC \uB0A0\uC9DC:',
  'about.license': '\uB77C\uC774\uC120\uC2A4',
  'about.licenseDesc': '\uC624\uD508 \uC18C\uC2A4\uC6A9, \uADF8\uB9AC\uACE0',
  'about.participate': '\uCC38\uC5EC',
  'about.discussOn': '\uD1A0\uB860:',
  'about.askQuestions': '\uC9C8\uBB38:',
  'about.visitMeetup': '\uBC29\uBB38:',
  'about.contributeCode': '\uCF54\uB4DC \uAE30\uC5EC:',
  'about.sendFeedback':
    '\uBE0C\uB77C\uC6B0\uC800 \uD53C\uB4DC\uBC31 \uC804\uC1A1:',
  'about.thanks': '\uAC10\uC0AC',
  'about.thanksDesc':
    '\uD658\uC0C1\uC801\uC778 \uCEE4\uBBA4\uB2C8\uD2F0 \uC5C6\uC774\uB294 Neo4j\uAC00 \uBD88\uAC00\uB2A5\uD588\uC744 \uAC83\uC785\uB2C8\uB2E4. \uBAA8\uB4E0 \uD53C\uB4DC\uBC31, \uD1A0\uB860, \uAE30\uC5EC\uC5D0 \uAC10\uC0AC\uB4DC\uB9BD\uB2C8\uB2E4.',
  'about.footer': '\uC2A4\uC6E8\uB374\uC5D0\uC11C \u2665\uB97C \uB2F4\uC544.',

  // Overview pane
  'overview.title': '\uAC1C\uC694',
  'overview.nodeLabels': '\uB178\uB4DC \uB77C\uBCA8',
  'overview.relTypes': '\uAD00\uACC4 \uD0C0\uC785',
  'overview.showing': '({visible}\uAC1C \uC911 {total}\uAC1C \uD45C\uC2DC)',
  'overview.truncatedFields':
    '\uB808\uCF54\uB4DC \uD544\uB4DC\uAC00 \uC798\uB838\uC2B5\uB2C8\uB2E4.',
  'overview.displaying':
    '{nodes}\uAC1C \uB178\uB4DC, {rels}\uAC1C \uAD00\uACC4 \uD45C\uC2DC \uC911.',

  // Default details pane
  'defaultDetails.nodeProperties': '\uB178\uB4DC \uC18D\uC131',
  'defaultDetails.relProperties': '\uAD00\uACC4 \uC18D\uC131',
  'defaultDetails.copyAll':
    '\uBAA8\uB4E0 \uC18D\uC131\uC744 \uD074\uB9BD\uBCF4\uB4DC\uC5D0 \uBCF5\uC0AC',

  // Unfound guide
  'unfound.title': '\uCC3E\uC744 \uC218 \uC5C6\uC74C',
  'unfound.desc':
    '\uC8C4\uC1A1\uD569\uB2C8\uB2E4. \uD574\uB2F9 \uB0B4\uC6A9\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.',
  'unfound.try': '\uB2E4\uC74C\uC744 \uC2DC\uB3C4\uD558\uC138\uC694:',
  'unfound.helpDesc':
    '- Neo4j Browser \uC0AC\uC6A9\uC5D0 \uB300\uD55C \uC77C\uBC18 \uB3C4\uC6C0\uB9D0',
  'unfound.guideDesc':
    '- \uC0AC\uC6A9 \uAC00\uB2A5\uD55C \uAC00\uC774\uB4DC \uBCF4\uAE30',
  'unfound.docsDesc': '- Neo4j\uC5D0 \uB300\uD55C \uC0C1\uC138 \uC815\uBCF4',

  // Intro guide
  'intro.title': '\uC18C\uAC1C \uAC00\uC774\uB4DC',
  'intro.s1.title': 'Neo4j Browser \uD0D0\uC0C9',
  'intro.s1.desc':
    'Neo4j Browser\uB294 \uC6F9 \uAE30\uBC18 \uC178 \uD658\uACBD\uC758 \uBA85\uB839 \uAE30\uBC18 \uD074\uB77C\uC774\uC5B8\uD2B8\uC785\uB2C8\uB2E4. \uC784\uC2DC \uADF8\uB798\uD504 \uCFFC\uB9AC\uB97C \uC2E4\uD589\uD558\uB294 \uB370 \uC801\uD569\uD558\uBA70, Neo4j \uAE30\uBC18 \uC560\uD50C\uB9AC\uCF00\uC774\uC158 \uD504\uB85C\uD1A0\uD0C0\uC774\uD551\uC5D0 \uCDA9\uBD84\uD55C \uAE30\uB2A5\uC744 \uC81C\uACF5\uD569\uB2C8\uB2E4.',
  'intro.s1.li1': '\uAC1C\uBC1C\uC790 \uC911\uC2EC.',
  'intro.s1.li2':
    'Cypher \uADF8\uB798\uD504 \uCFFC\uB9AC \uC791\uC131 \uBC0F \uC2E4\uD589\uC5D0 \uC0AC\uC6A9.',
  'intro.s1.li3':
    '\uBAA8\uB4E0 \uCFFC\uB9AC \uACB0\uACFC\uC758 \uB0B4\uBCF4\uB0BC \uC218 \uC788\uB294 \uD45C \uD615\uC2DD \uACB0\uACFC.',
  'intro.s1.li4':
    '\uB178\uB4DC\uC640 \uAD00\uACC4\uB97C \uD3EC\uD568\uD55C \uCFFC\uB9AC \uACB0\uACFC\uC758 \uADF8\uB798\uD504 \uC2DC\uAC01\uD654.',
  'intro.s2.title': 'Browser Editor (\uD3B8\uC9D1\uAE30)',
  'intro.s2.lead':
    'Cypher \uBB38\uACFC Browser \uBA85\uB839 \uD3B8\uC9D1 \uBC0F \uC2E4\uD589',
  'intro.s2.desc':
    '\uD3B8\uC9D1\uAE30\uB294 Cypher \uBB38\uACFC Browser \uBA85\uB839\uC744 \uC785\uB825\uD558\uACE0 \uC2E4\uD589\uD558\uB294 \uAE30\uBCF8 \uC778\uD130\uD398\uC774\uC2A4\uC785\uB2C8\uB2E4. Browser \uBA85\uB839\uC740 :\uC73C\uB85C \uC2DC\uC791\uD569\uB2C8\uB2E4. \uC608: :help.',
  'intro.s2.execute': '\uD604\uC7AC \uBA85\uB839 \uC2E4\uD589',
  'intro.s2.prevHistory': '\uC774\uC804 \uBA85\uB839 \uAE30\uB85D',
  'intro.s2.nextHistory': '\uB2E4\uC74C \uBA85\uB839 \uAE30\uB85D',
  'intro.s2.keybindingHint':
    ':help keys\uB97C \uC2E4\uD589\uD558\uAC70\uB098 \uD3B8\uC9D1\uAE30\uC5D0\uC11C F1\uC744 \uB20C\uB7EC \uBAA8\uB4E0 \uD3B8\uC9D1\uAE30 \uC804\uC6A9 \uD0A4\uBC14\uC778\uB529\uC744 \uD655\uC778\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.',
  'intro.s3.title': '\uACB0\uACFC \uD504\uB808\uC784',
  'intro.s3.lead':
    '\uAC00\uC7A5 \uCD5C\uADFC\uC5D0 \uC2E4\uD589\uB41C \uBA85\uB839 \uB610\uB294 Cypher \uCFFC\uB9AC',
  'intro.s3.desc':
    '\uAC01 \uC2E4\uD589\uB9C8\uB2E4 \uACB0\uACFC \uD504\uB808\uC784\uC774 \uC0DD\uC131\uB418\uC5B4 \uC2A4\uD2B8\uB9BC \uC0C1\uB2E8\uC5D0 \uCD94\uAC00\uB418\uBA70, \uC5ED\uC21C\uC73C\uB85C \uC2A4\uD06C\uB864 \uAC00\uB2A5\uD55C \uCEEC\uB809\uC158\uC744 \uB9CC\uB4ED\uB2C8\uB2E4.',
  'intro.s3.li1':
    '\uACE0\uC815\uB41C \uD504\uB808\uC784\uC740 \uD56D\uC0C1 \uAC19\uC740 \uC704\uCE58\uC5D0 \uC720\uC9C0\uB429\uB2C8\uB2E4.',
  'intro.s3.li2':
    ':clear \uBA85\uB839\uC744 \uC2E4\uD589\uD558\uC5EC \uACB0\uACFC \uD504\uB808\uC784 \uC2A4\uD2B8\uB9BC\uC744 \uC9C0\uC6B8 \uC218 \uC788\uC2B5\uB2C8\uB2E4.',
  'intro.s3.li3':
    '\uC2A4\uD2B8\uB9BC\uC5D0 \uD45C\uC2DC\uB418\uB294 \uCD5C\uB300 \uACB0\uACFC \uD504\uB808\uC784 \uC218\uB294 30\uAC1C\uC785\uB2C8\uB2E4. Browser \uC124\uC815\uC5D0\uC11C \uBCC0\uACBD\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.',
  'intro.s3.li4':
    ':history \uBA85\uB839\uC744 \uC2E4\uD589\uD558\uC5EC \uC2E4\uD589\uB41C \uBA85\uB839 \uBC0F \uCFFC\uB9AC \uAE30\uB85D\uC744 \uBCFC \uC218 \uC788\uC2B5\uB2C8\uB2E4.',
  'intro.s4.title': '\uC7AC\uC0AC\uC6A9 \uD504\uB808\uC784',
  'intro.s4.lead':
    '\uCFFC\uB9AC\uB97C \uC81C\uC790\uB9AC\uC5D0\uC11C \uC218\uC815',
  'intro.s4.desc1':
    '\uC2A4\uD06C\uB864 \uAC00\uB2A5\uD55C \uD504\uB808\uC784 \uC2A4\uD2B8\uB9BC\uC744 \uC0DD\uC131\uD558\uB294 \uB300\uC2E0 \uAC19\uC740 \uD504\uB808\uC784\uC5D0\uC11C \uBC18\uBCF5\uD560 \uC218\uB3C4 \uC788\uC2B5\uB2C8\uB2E4.',
  'intro.s4.desc2':
    '\uAC01 \uC7AC\uC0AC\uC6A9 \uD504\uB808\uC784\uC740 \uC790\uCCB4 \uBA85\uB839 \uAE30\uB85D\uC744 \uC720\uC9C0\uD558\uBA70, \uD3B8\uC9D1\uAE30\uC758 \uBA54\uC778 \uAE30\uB85D\uB3C4 \uC5C5\uB370\uC774\uD2B8\uD569\uB2C8\uB2E4.',
  'intro.s5.title':
    '\uC0AC\uC774\uB4DC\uBC14: \uB370\uC774\uD130\uBCA0\uC774\uC2A4',
  'intro.s5.lead': '\uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uC815\uBCF4',
  'intro.s5.desc':
    'Neo4j\uB97C \uC124\uCE58\uD558\uBA74 system \uB370\uC774\uD130\uBCA0\uC774\uC2A4\uC640 \uAE30\uBCF8 neo4j \uB370\uC774\uD130\uBCA0\uC774\uC2A4 2\uAC1C\uB85C \uCD08\uAE30\uD654\uB429\uB2C8\uB2E4. Neo4j Browser\uB97C \uC2E4\uD589\uD558\uBA74 \uD3B8\uC9D1\uAE30\uC758 neo4j$ \uD504\uB86C\uD504\uD2B8\uC5D0 \uD45C\uC2DC\uB418\uB294 neo4j \uB370\uC774\uD130\uBCA0\uC774\uC2A4\uB85C \uC790\uB3D9 \uC5F0\uACB0\uB429\uB2C8\uB2E4.',
  'intro.s6.title': '\uC0AC\uC774\uB4DC\uBC14: \uC990\uACA8\uCC3E\uAE30',
  'intro.s6.lead':
    '\uCFFC\uB9AC\uB97C \uBE60\uB974\uAC8C \uC800\uC7A5\uD558\uB294 \uBC29\uBC95',
  'intro.s6.desc1':
    '\uC990\uACA8\uCC3E\uB294 \uCFFC\uB9AC\uB098 \uBA85\uB839\uC744 \uB85C\uCEEC \uC800\uC7A5\uC18C\uC5D0 \uC800\uC7A5\uD558\uACE0 \uC0AC\uC774\uB4DC\uBC14\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.',
  'intro.s6.desc2':
    '\uC990\uACA8\uCC3E\uAE30\uB294 \uD504\uB85C\uC81D\uD2B8\uB098 \uB370\uC774\uD130\uBCA0\uC774\uC2A4\uC5D0 \uB3C5\uB9BD\uC801\uC778 \uC804\uC5ED \uC124\uC815\uC774\uBBF0\uB85C, \uB2E4\uB978 \uB370\uC774\uD130\uBCA0\uC774\uC2A4, \uD638\uC2A4\uD305 \uD50C\uB7AB\uD3FC, \uB370\uC774\uD130 \uC138\uD2B8\uC5D0\uC11C\uB3C4 \uC811\uADFC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.',
  'intro.s7.title':
    '\uC0AC\uC774\uB4DC\uBC14: \uD504\uB85C\uC81D\uD2B8 \uD30C\uC77C',
  'intro.s7.lead':
    'Cypher \uD30C\uC77C\uC744 \uC800\uC7A5\uD558\uC5EC \uB3D9\uB8CC\uC640 \uACF5\uC720',
  'intro.s7.desc1':
    '\uD504\uB85C\uC81D\uD2B8 \uD30C\uC77C\uC744 \uC0AC\uC6A9\uD558\uBA74 \uCFFC\uB9AC, \uAC00\uC774\uB4DC, \uAE30\uD0C0 \uC2A4\uD06C\uB9BD\uD2B8\uB97C Cypher \uD30C\uC77C\uB85C \uC800\uC7A5\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uBE0C\uB77C\uC6B0\uC800 \uB85C\uCEEC \uC800\uC7A5\uC18C\uC5D0 \uC800\uC7A5\uB418\uB294 \uC990\uACA8\uCC3E\uAE30\uC640 \uB2EC\uB9AC, \uD504\uB85C\uC81D\uD2B8 \uD30C\uC77C\uC740 \uD558\uB4DC \uB4DC\uB77C\uC774\uBE0C\uC758 \uD504\uB85C\uC81D\uD2B8 \uB514\uB809\uD1A0\uB9AC\uC5D0 \uC800\uC7A5\uB41C \uC2E4\uC81C \uD30C\uC77C\uC785\uB2C8\uB2E4.',
  'intro.s7.desc2':
    '\uD504\uB85C\uC81D\uD2B8 \uD30C\uC77C \uC11C\uB78D\uC740 Neo4j Desktop \uC804\uC6A9\uC785\uB2C8\uB2E4.',
  'intro.s8.title': '\uB2E4\uC74C \uB2E8\uACC4',
  'intro.s8.conceptsLink':
    '\uAC1C\uB150 \uAC00\uC774\uB4DC - Neo4j \uC18D\uC131 \uADF8\uB798\uD504 \uBC30\uC6B0\uAE30',
  'intro.s8.cypherLink':
    'Cypher \uAC00\uC774\uB4DC - Cypher \uAE30\uCD08 \uBC30\uC6B0\uAE30',
  'intro.s8.references': '\uCC38\uACE0 \uC790\uB8CC',
  'intro.s8.helpCommands':
    '\uB3C4\uC6C0\uB9D0 \uBA85\uB839 - \uC720\uC6A9\uD55C Neo4j Browser \uBA85\uB839',
  'intro.s8.helpKeys':
    '\uB3C4\uC6C0\uB9D0 \uD0A4 - \uD0A4\uBCF4\uB4DC \uB2E8\uCD95\uD0A4',

  // Concepts guide
  'concepts.title': '\uAC1C\uB150 \uAC00\uC774\uB4DC',
  'concepts.s1.title':
    '\uC18D\uC131 \uADF8\uB798\uD504 \uBAA8\uB378 \uAC1C\uB150',
  'concepts.s1.lead':
    '\uC2DC\uC791\uC744 \uC704\uD55C \uAE30\uBCF8 \uAC1C\uB150',
  'concepts.s1.desc':
    '\uADF8\uB798\uD504 \uB370\uC774\uD130\uBCA0\uC774\uC2A4\uB294 \uBA87 \uAC00\uC9C0 \uAE30\uBCF8 \uAC1C\uB150\uC744 \uC0AC\uC6A9\uD558\uC5EC \uBAA8\uB4E0 \uC885\uB958\uC758 \uB370\uC774\uD130\uB97C \uC800\uC7A5\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4:',
  'concepts.s1.li1':
    '\uB178\uB4DC - \uB3C4\uBA54\uC778\uC758 \uC5D4\uD2F0\uD2F0\uB97C \uB098\uD0C0\uB0C5\uB2C8\uB2E4.',
  'concepts.s1.li2':
    '\uB77C\uBCA8 - \uB178\uB4DC\uB97C \uC9D1\uD569\uC73C\uB85C \uADF8\uB8F9\uD654\uD558\uC5EC \uB3C4\uBA54\uC778\uC744 \uD615\uC131\uD569\uB2C8\uB2E4.',
  'concepts.s1.li3':
    '\uAD00\uACC4 - \uB450 \uB178\uB4DC\uB97C \uC5F0\uACB0\uD569\uB2C8\uB2E4.',
  'concepts.s1.li4':
    '\uC18D\uC131 - \uB178\uB4DC\uC640 \uAD00\uACC4\uC5D0 \uD488\uC9C8\uC744 \uCD94\uAC00\uD558\uB294 \uBA85\uBA85\uB41C \uAC12\uC785\uB2C8\uB2E4.',
  'concepts.s2.title': '\uB178\uB4DC',
  'concepts.s2.lead':
    'Neo4j\uB294 \uB370\uC774\uD130\uB97C \uADF8\uB798\uD504\uC5D0 \uB178\uB4DC\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4',
  'concepts.s2.desc':
    '\uAC00\uC7A5 \uB2E8\uC21C\uD55C \uADF8\uB798\uD504\uB294 \uC18D\uC131\uC774\uB77C\uB294 \uBA85\uBA85\uB41C \uAC12\uC744 \uAC00\uC9C4 \uB2E8\uC77C \uB178\uB4DC\uC785\uB2C8\uB2E4. \uC608\uB97C \uB4E4\uC5B4 \uC18C\uC15C \uADF8\uB798\uD504\uB97C \uADF8\uB824\uBCF4\uACA0\uC2B5\uB2C8\uB2E4:',
  'concepts.s2.li1':
    '\uB178\uB4DC\uC6A9 \uC6D0\uC744 \uADF8\uB9BD\uB2C8\uB2E4.',
  'concepts.s2.li2': '\uC774\uB984 Emil\uC744 \uCD94\uAC00\uD569\uB2C8\uB2E4.',
  'concepts.s2.li3':
    '\uADF8\uAC00 \uC2A4\uC6E8\uB374 \uCD9C\uC2E0\uC784\uC744 \uBA54\uBAA8\uD569\uB2C8\uB2E4.',
  'concepts.s2.keyInfo': '\uD575\uC2EC \uC815\uBCF4:',
  'concepts.s2.ki1':
    '\uB178\uB4DC\uB294 0\uAC1C \uC774\uC0C1\uC758 \uB77C\uBCA8\uB85C \uBD84\uB958\uD560 \uC218 \uC788\uB294 \uC5D4\uD2F0\uD2F0 \uB610\uB294 \uAC1C\uBCC4 \uAC1D\uCCB4\uB97C \uB098\uD0C0\uB0C5\uB2C8\uB2E4.',
  'concepts.s2.ki2':
    '\uB370\uC774\uD130\uB294 \uB178\uB4DC\uC758 \uC18D\uC131\uC73C\uB85C \uC800\uC7A5\uB429\uB2C8\uB2E4.',
  'concepts.s2.ki3':
    '\uC18D\uC131\uC740 \uB2E8\uC21C\uD55C \uD0A4-\uAC12 \uC30D\uC785\uB2C8\uB2E4.',
  'concepts.s3.title': '\uB77C\uBCA8',
  'concepts.s3.lead': '\uB178\uB4DC \uC9D1\uD569 \uC5F0\uACB0',
  'concepts.s3.desc':
    '\uAC01 \uBA64\uBC84\uC5D0 \uB77C\uBCA8\uC744 \uC801\uC6A9\uD558\uC5EC \uB178\uB4DC\uB97C \uADF8\uB8F9\uD654\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uC774 \uC18C\uC15C \uADF8\uB798\uD504\uC5D0\uC11C\uB294 Person\uC744 \uB098\uD0C0\uB0B4\uB294 \uAC01 \uB178\uB4DC\uC5D0 \uB77C\uBCA8\uC744 \uC9C0\uC815\uD569\uB2C8\uB2E4.',
  'concepts.s3.li1':
    'Emil\uC744 \uC704\uD574 \uB9CC\uB4E0 \uB178\uB4DC\uC5D0 "Person" \uB77C\uBCA8\uC744 \uCD94\uAC00\uD569\uB2C8\uB2E4.',
  'concepts.s3.li2':
    '"Person" \uB178\uB4DC\uB97C \uBE68\uAC04\uC0C9\uC73C\uB85C \uCE60\uD569\uB2C8\uB2E4.',
  'concepts.s3.keyInfo': '\uD575\uC2EC \uC815\uBCF4:',
  'concepts.s3.ki1':
    '\uB178\uB4DC\uB294 0\uAC1C \uC774\uC0C1\uC758 \uB77C\uBCA8\uC744 \uAC00\uC9C8 \uC218 \uC788\uC2B5\uB2C8\uB2E4.',
  'concepts.s3.ki2':
    '\uB77C\uBCA8\uC740 \uB178\uB4DC\uB97C \uBD84\uB958\uD558\uB294 \uB370 \uC0AC\uC6A9\uB429\uB2C8\uB2E4.',
  'concepts.s4.title': '\uB354 \uB9CE\uC740 \uB178\uB4DC',
  'concepts.s4.lead': 'Neo4j\uB294 \uC2A4\uD0A4\uB9C8 \uC790\uC720',
  'concepts.s4.desc':
    '\uB2E4\uB978 \uB370\uC774\uD130\uBCA0\uC774\uC2A4\uCC98\uB7FC Neo4j\uC5D0 \uB370\uC774\uD130\uB97C \uC800\uC7A5\uD558\uB294 \uAC83\uC740 \uB178\uB4DC\uB97C \uCD94\uAC00\uD558\uB294 \uAC83\uB9CC\uD07C \uAC04\uB2E8\uD569\uB2C8\uB2E4. \uB178\uB4DC\uB294 \uACF5\uD1B5 \uBC0F \uACE0\uC720 \uC18D\uC131\uC744 \uD63C\uD569\uD558\uC5EC \uAC00\uC9C8 \uC218 \uC788\uC2B5\uB2C8\uB2E4:',
  'concepts.s4.li1': 'Emil, Klout \uC810\uC218 99.',
  'concepts.s4.li2':
    'Johan, \uC2A4\uC6E8\uB374 \uCD9C\uC2E0, \uC11C\uD551\uC744 \uBC30\uC6B0\uB294 \uC911.',
  'concepts.s4.li3': 'Ian, \uC601\uAD6D \uCD9C\uC2E0, \uC791\uAC00.',
  'concepts.s4.li4':
    'Rik, \uBCA8\uAE30\uC5D0 \uCD9C\uC2E0, Orval\uC774\uB77C\uB294 \uACE0\uC591\uC774\uB97C \uD0A4\uC6C0.',
  'concepts.s4.li5':
    'Allison, \uBBF8\uAD6D \uCD9C\uC2E0, \uC11C\uD551\uC744 \uD568.',
  'concepts.s4.keyInfo': '\uD575\uC2EC \uC815\uBCF4:',
  'concepts.s4.ki1':
    '\uC720\uC0AC\uD55C \uB178\uB4DC\uB3C4 \uB2E4\uB978 \uC18D\uC131\uC744 \uAC00\uC9C8 \uC218 \uC788\uC2B5\uB2C8\uB2E4.',
  'concepts.s4.ki2':
    '\uC18D\uC131\uC740 `number`, `string`, `boolean` \uB4F1 \uB2E4\uC591\uD55C \uB370\uC774\uD130 \uD0C0\uC785\uC744 \uB2F4\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4.',
  'concepts.s4.ki3':
    '\uC18D\uC131\uC740 \uBB38\uC790\uC5F4, \uC22B\uC790, \uBD88\uB9AC\uC5B8 \uAC12\uC744 \uD3EC\uD568\uD558\uB294 \uB3D9\uC885 \uB9AC\uC2A4\uD2B8(\uBC30\uC5F4)\uC77C \uC218\uB3C4 \uC788\uC2B5\uB2C8\uB2E4.',
  'concepts.s4.ki4':
    'Neo4j\uB294 \uC218\uC2ED\uC5B5 \uAC1C\uC758 \uB178\uB4DC\uB97C \uC800\uC7A5\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.',
  'concepts.s5.title': '\uAD00\uACC4',
  'concepts.s5.lead': '\uB178\uB4DC \uC5F0\uACB0',
  'concepts.s5.desc1':
    'Neo4j\uC758 \uC9C4\uC815\uD55C \uD798\uC740 \uC5F0\uACB0\uB41C \uB370\uC774\uD130\uC5D0 \uC788\uC2B5\uB2C8\uB2E4. \uB450 \uB178\uB4DC\uB97C \uC5F0\uACB0\uD558\uB824\uBA74 \uB808\uCF54\uB4DC \uAC04\uC758 \uAD00\uACC4\uB97C \uC124\uBA85\uD558\uB294 \uAD00\uACC4\uB97C \uCD94\uAC00\uD569\uB2C8\uB2E4.',
  'concepts.s5.desc2':
    '\uC6B0\uB9AC\uC758 \uC18C\uC15C \uADF8\uB798\uD504\uC5D0\uC11C \uB204\uAC00 \uB204\uAD6C\uB97C \uC544\uB294\uC9C0(KNOWS \uAD00\uACC4 \uD0C0\uC785) \uAC04\uB2E8\uD788 \uB9D0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4:',
  'concepts.s5.li1':
    'Emil\uC740 Johan\uACFC Ian\uC744 \uC54C\uACE0 \uC788\uC2B5\uB2C8\uB2E4.',
  'concepts.s5.li2':
    'Johan\uC740 Ian\uACFC Rik\uC744 \uC54C\uACE0 \uC788\uC2B5\uB2C8\uB2E4.',
  'concepts.s5.li3':
    'Rik\uACFC Ian\uC740 Allison\uC744 \uC54C\uACE0 \uC788\uC2B5\uB2C8\uB2E4.',
  'concepts.s5.keyInfo': '\uD575\uC2EC \uC815\uBCF4:',
  'concepts.s5.ki1':
    '\uAD00\uACC4\uB294 \uD56D\uC0C1 \uBC29\uD5A5\uC774 \uC788\uC2B5\uB2C8\uB2E4.',
  'concepts.s5.ki2':
    '\uAD00\uACC4\uB294 \uD56D\uC0C1 \uD0C0\uC785\uC774 \uC788\uC2B5\uB2C8\uB2E4.',
  'concepts.s5.ki3':
    '\uAD00\uACC4\uB294 \uB370\uC774\uD130 \uD328\uD134, \uC989 \uADF8\uB798\uD504\uC758 \uAD6C\uC870\uB97C \uD615\uC131\uD569\uB2C8\uB2E4.',
  'concepts.s6.title': '\uAD00\uACC4 \uC18D\uC131',
  'concepts.s6.lead':
    '\uB450 \uB178\uB4DC\uAC00 \uACF5\uC720\uD558\uB294 \uC815\uBCF4 \uC800\uC7A5',
  'concepts.s6.desc':
    '\uC18D\uC131 \uADF8\uB798\uD504\uC5D0\uC11C \uAD00\uACC4\uB3C4 \uAD00\uACC4\uB97C \uC124\uBA85\uD558\uB294 \uC18D\uC131\uC744 \uD3EC\uD568\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. Emil\uC758 \uAD00\uACC4\uB97C \uC790\uC138\uD788 \uBCF4\uBA74:',
  'concepts.s6.li1':
    'Emil\uC740 2001\uB144\uBD80\uD130 Johan\uC744 \uC54C\uACE0 \uC788\uC2B5\uB2C8\uB2E4.',
  'concepts.s6.li2':
    'Emil\uC740 Ian\uC744 5\uC810 \uB9CC\uC810\uC5D0 5\uC810\uC73C\uB85C \uD3C9\uAC00\uD569\uB2C8\uB2E4.',
  'concepts.s6.li3':
    '\uB2E4\uB978 \uBAA8\uB4E0 \uC0AC\uB78C\uB3C4 \uC720\uC0AC\uD55C \uAD00\uACC4 \uC18D\uC131\uC744 \uAC00\uC9C8 \uC218 \uC788\uC2B5\uB2C8\uB2E4.',
  'concepts.s7.title': '\uB2E4\uC74C \uB2E8\uACC4',
  'concepts.s7.cypherLink':
    'Cypher \uAC00\uC774\uB4DC - Cypher \uAE30\uCD08 \uBC30\uC6B0\uAE30',

  // Cypher guide
  'cypher.title': 'Cypher \uAC00\uC774\uB4DC',
  'cypher.s1.lead': 'Neo4j\uC758 \uADF8\uB798\uD504 \uCFFC\uB9AC \uC5B8\uC5B4',
  'cypher.s1.desc':
    'Neo4j\uC758 Cypher \uC5B8\uC5B4\uB294 \uADF8\uB798\uD504 \uB370\uC774\uD130 \uC791\uC5C5\uC744 \uC704\uD574 \uD2B9\uBCC4\uD788 \uC124\uACC4\uB418\uC5C8\uC2B5\uB2C8\uB2E4.',
  'cypher.s1.li1':
    '\uD328\uD134\uC744 \uC0AC\uC6A9\uD558\uC5EC \uADF8\uB798\uD504 \uB370\uC774\uD130\uB97C \uC124\uBA85\uD569\uB2C8\uB2E4.',
  'cypher.s1.li2': '\uC775\uC219\uD55C SQL\uACFC \uC720\uC0AC\uD55C \uC808.',
  'cypher.s1.li3':
    '\uC120\uC5B8\uC801\uC73C\uB85C, \uCC3E\uB294 \uBC29\uBC95\uC774 \uC544\uB2CC \uBB34\uC5C7\uC744 \uCC3E\uC744\uC9C0 \uC124\uBA85\uD569\uB2C8\uB2E4.',
  'cypher.s2.title': 'CREATE',
  'cypher.s2.lead': '\uB178\uB4DC \uC0DD\uC131',
  'cypher.s2.desc':
    'Cypher\uB97C \uC0AC\uC6A9\uD558\uC5EC \uC791\uC740 \uC18C\uC15C \uADF8\uB798\uD504\uB97C \uC0DD\uC131\uD574 \uBCF4\uACA0\uC2B5\uB2C8\uB2E4.',
  'cypher.s2.note':
    '\uC774 \uAC00\uC774\uB4DC\uB294 \uBE48 \uADF8\uB798\uD504\uB97C \uC0AC\uC6A9\uD55C\uB2E4\uACE0 \uAC00\uC815\uD569\uB2C8\uB2E4.',
  'cypher.s2.clickCode':
    '\uC774 \uCF54\uB4DC \uBE14\uB85D\uC744 \uD074\uB9AD\uD558\uC5EC \uD3B8\uC9D1\uAE30\uC5D0 \uAC00\uC838\uC624\uC138\uC694:',
  'cypher.s2.createExplain':
    'CREATE\uB294 \uB178\uB4DC\uB97C \uC0DD\uC131\uD569\uB2C8\uB2E4.',
  'cypher.s2.parenExplain':
    '()\uB294 \uB178\uB4DC\uB97C \uB098\uD0C0\uB0C5\uB2C8\uB2E4.',
  'cypher.s2.varExplain':
    'ee:Person \u2013 ee\uB294 \uB178\uB4DC \uBCC0\uC218\uC774\uACE0 Person\uC740 \uB178\uB4DC \uB77C\uBCA8\uC785\uB2C8\uB2E4.',
  'cypher.s2.propsExplain':
    '{}\uB294 \uB178\uB4DC\uB97C \uC124\uBA85\uD558\uB294 \uC18D\uC131\uC744 \uD3EC\uD568\uD569\uB2C8\uB2E4.',
  'cypher.s2.runButton':
    'Run \uBC84\uD2BC\uC744 \uD074\uB9AD\uD558\uC5EC Cypher \uCF54\uB4DC\uB97C \uC2E4\uD589\uD569\uB2C8\uB2E4.',
  'cypher.s3.title': 'MATCH',
  'cypher.s3.lead': '\uB178\uB4DC \uCC3E\uAE30',
  'cypher.s3.desc':
    '\uC774\uC81C Emil\uC744 \uB098\uD0C0\uB0B4\uB294 \uB178\uB4DC\uB97C \uCC3E\uC544\uBCF4\uACA0\uC2B5\uB2C8\uB2E4.',
  'cypher.s3.clickCode':
    '\uC774 \uCF54\uB4DC \uBE14\uB85D\uC744 \uD074\uB9AD\uD558\uC5EC \uD3B8\uC9D1\uAE30\uC5D0 \uAC00\uC838\uC624\uC138\uC694:',
  'cypher.s3.matchExplain':
    'MATCH\uB294 \uB178\uB4DC\uC640 \uAD00\uACC4\uC758 \uD328\uD134\uC744 \uC9C0\uC815\uD569\uB2C8\uB2E4.',
  'cypher.s3.patternExplain':
    '(ee:Person)\uC740 Person \uB77C\uBCA8\uC774 \uC788\uB294 \uB2E8\uC77C \uB178\uB4DC \uD328\uD134\uC785\uB2C8\uB2E4. \uC77C\uCE58\uD558\uB294 \uD56D\uBAA9\uC744 \uBCC0\uC218 ee\uC5D0 \uD560\uB2F9\uD569\uB2C8\uB2E4.',
  'cypher.s3.whereExplain':
    'WHERE\uB294 \uCFFC\uB9AC\uB97C \uD544\uD130\uB9C1\uD569\uB2C8\uB2E4.',
  'cypher.s3.compareExplain':
    "ee.name = 'Emil'\uC740 name \uC18D\uC131\uC744 \uAC12 Emil\uACFC \uBE44\uAD50\uD569\uB2C8\uB2E4.",
  'cypher.s3.returnExplain':
    'RETURN\uC740 \uD2B9\uC815 \uACB0\uACFC\uB97C \uBC18\uD658\uD569\uB2C8\uB2E4.',
  'cypher.s3.runButton':
    'Run \uBC84\uD2BC\uC744 \uD074\uB9AD\uD558\uC5EC Cypher \uCF54\uB4DC\uB97C \uC2E4\uD589\uD569\uB2C8\uB2E4.',
  'cypher.s4.title': 'CREATE \uB354 \uB9CE\uC740 \uB370\uC774\uD130',
  'cypher.s4.lead': '\uB178\uB4DC\uC640 \uAD00\uACC4',
  'cypher.s4.desc':
    'CREATE \uC808\uC740 \uB9CE\uC740 \uB178\uB4DC\uC640 \uAD00\uACC4\uB97C \uD55C \uBC88\uC5D0 \uC0DD\uC131\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.',
  'cypher.s5.title': 'MATCH \uD328\uD134',
  'cypher.s5.lead':
    '\uADF8\uB798\uD504\uC5D0\uC11C \uCC3E\uC744 \uB0B4\uC6A9 \uC124\uBA85',
  'cypher.s5.desc':
    '\uC608\uB97C \uB4E4\uC5B4, \uD328\uD134\uC744 \uC0AC\uC6A9\uD558\uC5EC Emil\uC758 \uCE5C\uAD6C\uB97C \uCC3E\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4:',
  'cypher.s5.matchExplain':
    '\uD328\uD134\uC5D0 \uB530\uB77C \uAC80\uC0C9\uD560 \uB178\uB4DC\uB97C \uC124\uBA85\uD569\uB2C8\uB2E4.',
  'cypher.s5.eeExplain':
    'WHERE \uC808\uC5D0 \uB530\uB77C \uBC18\uD658\uB420 \uB178\uB4DC \uCC38\uC870\uC785\uB2C8\uB2E4.',
  'cypher.s5.knowsExplain':
    'ee\uC5D0\uC11C \uC591\uBC29\uD5A5\uC73C\uB85C KNOWS \uAD00\uACC4\uB97C \uB9E4\uCE6D\uD569\uB2C8\uB2E4.',
  'cypher.s5.friendsExplain':
    'Emil\uC758 \uCE5C\uAD6C\uC778 \uB178\uB4DC\uB97C \uB098\uD0C0\uB0C5\uB2C8\uB2E4.',
  'cypher.s5.returnExplain':
    '(ee)\uB85C \uCC38\uC870\uB41C \uB178\uB4DC\uC640 \uAD00\uB828\uB41C (friends) \uB178\uB4DC\uB97C \uBC18\uD658\uD569\uB2C8\uB2E4.',
  'cypher.s6.title': '\uB2E4\uC74C \uB2E8\uACC4',
  'cypher.s6.movieLink':
    'The Movie Graph \u2013 Cypher\uB97C \uD65C\uC6A9\uD55C \uCFFC\uB9AC\uC640 \uCD94\uCC9C - \uC601\uD654 \uC0AC\uC6A9 \uC0AC\uB840.',
  'cypher.s6.northwindLink':
    'The Northwind Graph \u2013 \uAD00\uACC4\uD615 \uB370\uC774\uD130\uB97C \uADF8\uB798\uD504\uB85C \uBCC0\uD658 \uBC0F \uAC00\uC838\uC624\uAE30.',
  'cypher.s6.references': '\uCC38\uACE0 \uC790\uB8CC',
  'cypher.s6.helpCommands':
    '\uB3C4\uC6C0\uB9D0 \uBA85\uB839 - \uC720\uC6A9\uD55C Neo4j Browser \uBA85\uB839',
  'cypher.s6.helpKeys':
    '\uB3C4\uC6C0\uB9D0 \uD0A4 - \uD0A4\uBCF4\uB4DC \uB2E8\uCD95\uD0A4',

  // Movie graph guide
  'movie.title': '\uC601\uD654 \uADF8\uB798\uD504 \uAC00\uC774\uB4DC',
  'movie.s1.desc':
    'Movie Graph\uB294 \uBC30\uC6B0\uC640 \uAC10\uB3C5\uC774 \uD611\uC5C5\uD55C \uC601\uD654\uB97C \uD1B5\uD574 \uC5F0\uACB0\uB41C \uBBF8\uB2C8 \uADF8\uB798\uD504 \uC560\uD50C\uB9AC\uCF00\uC774\uC158\uC785\uB2C8\uB2E4.',
  'movie.s1.showHow':
    '\uC774 \uAC00\uC774\uB4DC\uB294 \uB2E4\uC74C\uC744 \uBCF4\uC5EC\uC90D\uB2C8\uB2E4:',
  'movie.s1.load':
    '\uB85C\uB4DC: \uC601\uD654 \uB370\uC774\uD130\uB97C \uADF8\uB798\uD504\uC5D0 \uC0BD\uC785.',
  'movie.s1.constrain':
    '\uC81C\uC57D\uC870\uAC74: \uACE0\uC720 \uB178\uB4DC \uC18D\uC131 \uC81C\uC57D\uC870\uAC74 \uC0DD\uC131.',
  'movie.s1.index':
    '\uC778\uB371\uC2A4: \uB77C\uBCA8 \uAE30\uBC18 \uB178\uB4DC \uC778\uB371\uC2F1.',
  'movie.s1.find':
    '\uCC3E\uAE30: \uAC1C\uBCC4 \uC601\uD654\uC640 \uBC30\uC6B0 \uAC80\uC0C9.',
  'movie.s1.query':
    '\uCFFC\uB9AC: \uAD00\uB828 \uBC30\uC6B0\uC640 \uAC10\uB3C5 \uD0D0\uC0C9.',
  'movie.s1.solve': '\uD480\uAE30: \uBCA0\uC774\uCEE8 \uACBD\uB85C.',
  'movie.s2.title': '\uC0DD\uC131',
  'movie.s2.lead': '\uC601\uD654 \uADF8\uB798\uD504 \uC0DD\uC131',
  'movie.s2.desc':
    '\uB2E4\uC74C \uCF54\uB4DC \uBE14\uB85D\uC744 \uC0AC\uC6A9\uD558\uC5EC \uC601\uD654 \uADF8\uB798\uD504\uB97C \uC0DD\uC131\uD569\uB2C8\uB2E4. \uC5EC\uB7EC CREATE \uC808\uB85C \uAD6C\uC131\uB41C \uB2E8\uC77C Cypher \uCFFC\uB9AC \uBB38\uC785\uB2C8\uB2E4.',
  'movie.s2.note':
    '\uC774 \uAC00\uC774\uB4DC\uB294 \uBE48 \uADF8\uB798\uD504\uB97C \uC0AC\uC6A9\uD55C\uB2E4\uACE0 \uAC00\uC815\uD569\uB2C8\uB2E4. \uB370\uC774\uD130\uAC00 \uC788\uC73C\uBA74 9\uD398\uC774\uC9C0\uC758 \uC815\uB9AC \uBC29\uBC95\uC744 \uCC38\uC870\uD558\uC138\uC694.',
  'movie.s2.clickCode':
    '\uC774 \uCF54\uB4DC \uBE14\uB85D\uC744 \uD074\uB9AD\uD558\uC5EC \uD3B8\uC9D1\uAE30\uC5D0 \uAC00\uC838\uC624\uC138\uC694:',
  'movie.s2.runButton':
    'Run \uBC84\uD2BC\uC744 \uD074\uB9AD\uD558\uC5EC Cypher \uCF54\uB4DC\uB97C \uC2E4\uD589\uD569\uB2C8\uB2E4.',
  'movie.s2.wait':
    '\uC791\uC5C5\uC774 \uC644\uB8CC\uB420 \uB54C\uAE4C\uC9C0 \uAE30\uB2E4\uB9AC\uC138\uC694.',
  'movie.s3.title': '\uC81C\uC57D\uC870\uAC74 \uC0DD\uC131',
  'movie.s3.lead':
    '\uACE0\uC720 \uB178\uB4DC \uC18D\uC131 \uC81C\uC57D\uC870\uAC74',
  'movie.s3.desc':
    '\uD2B9\uC815 \uB77C\uBCA8\uC758 \uBAA8\uB4E0 \uB178\uB4DC\uC5D0 \uB300\uD574 \uC18D\uC131 \uAC12\uC774 \uACE0\uC720\uD558\uB3C4\uB85D \uACE0\uC720 \uB178\uB4DC \uC18D\uC131 \uC81C\uC57D\uC870\uAC74\uC744 \uC0DD\uC131\uD569\uB2C8\uB2E4. \uACE0\uC720 \uC81C\uC57D\uC870\uAC74\uC744 \uCD94\uAC00\uD558\uBA74 \uD574\uB2F9 \uC18D\uC131\uC5D0 \uC778\uB371\uC2A4\uAC00 \uC554\uBB35\uC801\uC73C\uB85C \uCD94\uAC00\uB429\uB2C8\uB2E4.',
  'movie.s4.title': '\uB178\uB4DC \uC778\uB371\uC2F1',
  'movie.s4.lead':
    '\uC9C0\uC815\uB41C \uB77C\uBCA8\uC744 \uAC00\uC9C4 \uBAA8\uB4E0 \uB178\uB4DC\uC758 \uD558\uB098 \uC774\uC0C1\uC758 \uC18D\uC131\uC5D0 \uC778\uB371\uC2A4\uB97C \uC0DD\uC131\uD569\uB2C8\uB2E4. \uC778\uB371\uC2A4\uB294 \uAC80\uC0C9 \uC131\uB2A5\uC744 \uD5A5\uC0C1\uC2DC\uD0A4\uB294 \uB370 \uC0AC\uC6A9\uB429\uB2C8\uB2E4.',
  'movie.s5.title': '\uCC3E\uAE30',
  'movie.s5.lead': '\uAC1C\uBCC4 \uB178\uB4DC \uCC3E\uAE30',
  'movie.s5.li1':
    '\uB2E4\uC74C \uCFFC\uB9AC \uC608\uC81C \uC911 \uD558\uB098\uB97C \uC2E4\uD589\uD558\uC138\uC694.',
  'movie.s5.li2':
    '\uAD6C\uBB38 \uD328\uD134\uC744 \uD655\uC778\uD558\uC138\uC694.',
  'movie.s5.li3':
    '\uB2E4\uB978 \uC601\uD654\uB098 \uBC30\uC6B0\uB97C \uCC3E\uC544\uBCF4\uC138\uC694.',
  'movie.s5.findTom': '"Tom Hanks"\uB77C\uB294 \uBC30\uC6B0 \uCC3E\uAE30:',
  'movie.s5.findCloud':
    '"Cloud Atlas" \uC81C\uBAA9\uC758 \uC601\uD654 \uCC3E\uAE30:',
  'movie.s5.find10':
    '10\uBA85\uC758 \uC0AC\uB78C\uC744 \uCC3E\uACE0 \uC774\uB984 \uBC18\uD658:',
  'movie.s5.find90s':
    '1990\uB144\uB300\uC5D0 \uAC1C\uBD09\uB41C \uC601\uD654\uB97C \uCC3E\uACE0 \uC81C\uBAA9\uC744 \uBC18\uD658.',
  'movie.s6.title': '\uCFFC\uB9AC',
  'movie.s6.lead': '\uD328\uD134 \uCC3E\uAE30',
  'movie.s6.desc':
    '\uAD00\uACC4 \uD0C0\uC785\uC744 \uC0AC\uC6A9\uD558\uC5EC \uADF8\uB798\uD504 \uB0B4 \uD328\uD134\uC744 \uCC3E\uC2B5\uB2C8\uB2E4. \uC608: ACTED_IN \uB610\uB294 DIRECTED. \uB2E4\uB978 \uAD00\uACC4\uB294 \uBB34\uC5C7\uC774 \uC788\uC744\uAE4C\uC694?',
  'movie.s6.q1': 'Tom Hanks\uAC00 \uCD9C\uC5F0\uD55C \uC601\uD654\uB294?',
  'movie.s6.q2': '"Cloud Atlas"\uB97C \uAC10\uB3C5\uD55C \uC0AC\uB78C\uC740?',
  'movie.s6.q3': 'Tom Hanks\uC758 \uACF5\uB3D9 \uCD9C\uC5F0\uC790\uB294?',
  'movie.s6.q4':
    '"Cloud Atlas"\uC640 \uAD00\uB828\uB41C \uC0AC\uB78C\uB4E4\uC740?',
  'movie.s7.title': '\uD480\uAE30',
  'movie.s7.lead': '\uCF00\uBE48 \uBCA0\uC774\uCEE8\uC758 6\uB2E8\uACC4',
  'movie.s7.desc':
    '\uD074\uB798\uC2DD "6\uB2E8\uACC4 \uBCA0\uC774\uCEE8 \uACBD\uB85C"\uB97C \uB4E4\uC5B4\uBCF4\uC168\uC744 \uAC83\uC785\uB2C8\uB2E4. \uC774\uB294 \uB2E8\uC21C\uD788 \uB450 \uB178\uB4DC \uAC04\uC758 \uCD5C\uB2E8 \uACBD\uB85C\uC785\uB2C8\uB2E4.',
  'movie.s7.q1desc':
    '\uAC00\uBCC0 \uAE38\uC774 \uD328\uD134\uC744 \uC0AC\uC6A9\uD558\uC5EC Kevin Bacon\uC5D0\uC11C 4"\uD649" \uC774\uB0B4\uC758 \uC601\uD654\uC640 \uBC30\uC6B0\uB97C \uCC3E\uC2B5\uB2C8\uB2E4.',
  'movie.s7.q2desc':
    '\uB0B4\uC7A5 shortestPath() \uC54C\uACE0\uB9AC\uC998\uC744 \uC0AC\uC6A9\uD558\uC5EC Meg Ryan\uAE4C\uC9C0\uC758 "\uBCA0\uC774\uCEE8 \uACBD\uB85C"\uB97C \uCC3E\uC2B5\uB2C8\uB2E4.',
  'movie.s8.title': '\uCD94\uCC9C',
  'movie.s8.lead':
    '\uC0C8\uB85C\uC6B4 \uACF5\uB3D9 \uCD9C\uC5F0\uC790 \uCD94\uCC9C',
  'movie.s8.desc':
    'Tom Hanks\uC5D0\uAC8C \uC0C8\uB85C\uC6B4 \uACF5\uB3D9 \uCD9C\uC5F0\uC790\uB97C \uCD94\uCC9C\uD574 \uBCF4\uACA0\uC2B5\uB2C8\uB2E4. \uAE30\uBCF8 \uCD94\uCC9C \uBC29\uBC95\uC740 \uC9C1\uC811 \uC774\uC6C3\uC744 \uB118\uC5B4\uC11C \uC798 \uC5F0\uACB0\uB41C \uC5F0\uACB0\uC744 \uCC3E\uB294 \uAC83\uC785\uB2C8\uB2E4.',
  'movie.s8.forTom': 'Tom Hanks\uC758 \uACBD\uC6B0:',
  'movie.s8.li1':
    'Tom Hanks\uC758 \uACF5\uB3D9 \uCD9C\uC5F0\uC790\uB97C \uD655\uC7A5\uD558\uC5EC Tom Hanks\uC640 \uD568\uAED8 \uC791\uC5C5\uD558\uC9C0 \uC54A\uC740 \uACF5\uB3D9-\uACF5\uB3D9 \uCD9C\uC5F0\uC790\uB97C \uCC3E\uC2B5\uB2C8\uB2E4.',
  'movie.s8.li2':
    'Tom Hanks\uB97C \uC798\uC7AC\uC801 \uACF5\uB3D9 \uCD9C\uC5F0\uC790\uC778 Tom Cruise\uC5D0\uAC8C \uC18C\uAC1C\uD574 \uC904 \uC218 \uC788\uB294 \uC0AC\uB78C\uC744 \uCC3E\uC2B5\uB2C8\uB2E4.',
  'movie.s9.title': '\uC815\uB9AC',
  'movie.s9.lead': '\uC601\uD654 \uB370\uC774\uD130 \uC138\uD2B8 \uC81C\uAC70',
  'movie.s9.desc':
    '\uC2E4\uD5D8\uC774 \uB05D\uB098\uBA74 \uADF8\uB798\uD504\uB97C \uC815\uB9AC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.',
  'movie.s9.note':
    '\uAD00\uACC4\uAC00 \uC788\uB294 \uB178\uB4DC\uB294 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC73C\uBBF0\uB85C, \uB178\uB4DC\uB97C \uBD84\uB9AC(DETACH)\uD558\uC5EC \uC0AD\uC81C\uD574\uC57C \uD569\uB2C8\uB2E4.',
  'movie.s9.li1':
    '\uBAA8\uB4E0 Movie \uBC0F Person \uB178\uB4DC\uC640 \uAD00\uACC4\uB97C \uC0AD\uC81C\uD569\uB2C8\uB2E4.',
  'movie.s9.li2':
    'Movie Graph\uAC00 \uC81C\uAC70\uB418\uC5C8\uB294\uC9C0 \uD655\uC778\uD569\uB2C8\uB2E4.',
  'movie.s10.title': '\uB2E4\uC74C \uB2E8\uACC4',
  'movie.s10.northwindLink':
    'Northwind Graph \u2013 RDBMS\uC5D0\uC11C \uADF8\uB798\uD504\uB85C.',
  'movie.s10.gistLink':
    '\uB354 \uB9CE\uC740 \uAC00\uC774\uB4DC \uD0D0\uC0C9: Graph Gists Portal',
  'movie.s10.docsTitle': '\uBB38\uC11C',

  // Northwind graph guide
  'northwind.title': 'Northwind \uADF8\uB798\uD504 \uAC00\uC774\uB4DC',
  'northwind.s1.lead':
    '\uD074\uB798\uC2DD \uB370\uC774\uD130\uC14B\uC744 \uC0AC\uC6A9\uD558\uC5EC RDBMS\uC5D0\uC11C \uADF8\uB798\uD504\uB85C',
  'northwind.s1.desc':
    'Northwind Graph\uB294 \uAD00\uACC4\uD615 \uB370\uC774\uD130\uBCA0\uC774\uC2A4\uC5D0\uC11C Neo4j\uB85C \uB9C8\uC774\uADF8\uB808\uC774\uC158\uD558\uB294 \uBC29\uBC95\uC744 \uBCF4\uC5EC\uC90D\uB2C8\uB2E4. \uBCC0\uD658\uC740 \uBC18\uBCF5\uC801\uC774\uACE0 \uC758\uB3C4\uC801\uC774\uBA70, \uAD00\uACC4\uD615 \uD14C\uC774\uBE14\uC5D0\uC11C \uB178\uB4DC\uC640 \uAD00\uACC4\uB85C\uC758 \uAC1C\uB150\uC801 \uC804\uD658\uC744 \uAC15\uC870\uD569\uB2C8\uB2E4.',
  'northwind.s1.showHow':
    '\uC774 \uAC00\uC774\uB4DC\uB294 \uB2E4\uC74C\uC744 \uBCF4\uC5EC\uC90D\uB2C8\uB2E4:',
  'northwind.s1.load':
    '\uB85C\uB4DC: \uC678\uBD80 CSV \uD30C\uC77C\uC5D0\uC11C \uB370\uC774\uD130 \uB85C\uB4DC.',
  'northwind.s1.index':
    '\uC778\uB371\uC2A4: \uB77C\uBCA8 \uAE30\uBC18 \uB178\uB4DC \uC778\uB371\uC2F1.',
  'northwind.s1.relate':
    '\uAD00\uACC4: \uC678\uB798 \uD0A4 \uCC38\uC870\uB97C \uB370\uC774\uD130 \uAD00\uACC4\uB85C \uBCC0\uD658.',
  'northwind.s1.promote':
    '\uC2B9\uACA9: \uC870\uC778 \uB808\uCF54\uB4DC\uB97C \uAD00\uACC4\uB85C \uBCC0\uD658.',
  'northwind.s2.title': '\uC81C\uD488 \uCE74\uD0C8\uB85C\uADF8 \uB85C\uB4DC',
  'northwind.s2.lead':
    '\uC678\uBD80 CSV \uD30C\uC77C\uC5D0\uC11C \uC81C\uD488 \uCE74\uD0C8\uB85C\uADF8 \uB370\uC774\uD130 \uB85C\uB4DC',
  'northwind.s2.desc':
    'Northwind\uB294 \uACF5\uAE09\uC5C5\uCCB4\uAC00 \uC81C\uACF5\uD558\uB294 \uBA87 \uAC00\uC9C0 \uCE74\uD14C\uACE0\uB9AC\uC758 \uC2DD\uD488\uC744 \uD310\uB9E4\uD569\uB2C8\uB2E4. \uC81C\uD488 \uCE74\uD0C8\uB85C\uADF8 \uD14C\uC774\uBE14\uC744 \uB85C\uB4DC\uD558\uB294 \uAC83\uBD80\uD130 \uC2DC\uC791\uD558\uACA0\uC2B5\uB2C8\uB2E4.',
  'northwind.s2.csvNote':
    '\uB85C\uB4DC \uBB38\uC740 \uACF5\uAC1C \uC778\uD130\uB137 \uC561\uC138\uC2A4\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4. LOAD CSV\uB294 \uC720\uD6A8\uD55C URL\uC5D0\uC11C CSV \uD30C\uC77C\uC744 \uAC00\uC838\uC640 \uBA85\uBA85\uB41C \uB9F5\uC744 \uC0AC\uC6A9\uD558\uC5EC \uAC01 \uD589\uC5D0 Cypher \uBB38\uC744 \uC801\uC6A9\uD569\uB2C8\uB2E4. \uC774 \uC608\uC81C\uB294 row\uB77C\uB294 \uC774\uB984\uC744 \uC0AC\uC6A9\uD569\uB2C8\uB2E4.',
  'northwind.s2.loadProduct': '\uC81C\uD488 \uB370\uC774\uD130 \uB85C\uB4DC.',
  'northwind.s2.loadCategory':
    '\uCE74\uD14C\uACE0\uB9AC \uB370\uC774\uD130 \uB85C\uB4DC.',
  'northwind.s2.loadSupplier':
    '\uACF5\uAE09\uC5C5\uCCB4 \uB370\uC774\uD130 \uB85C\uB4DC.',
  'northwind.s3.title':
    '\uC81C\uD488 \uCE74\uD0C8\uB85C\uADF8 \uB370\uC774\uD130 \uC778\uB371\uC2F1',
  'northwind.s3.lead':
    '\uB77C\uBCA8 \uAE30\uBC18 \uB178\uB4DC \uC778\uB371\uC2A4 \uC0DD\uC131',
  'northwind.s4.title':
    '\uC81C\uD488 \uCE74\uD0C8\uB85C\uADF8 \uB370\uC774\uD130 \uAD00\uACC4 \uC124\uC815',
  'northwind.s4.lead':
    '\uC678\uB798 \uD0A4 \uCC38\uC870\uB97C \uB370\uC774\uD130 \uAD00\uACC4\uB85C \uBCC0\uD658',
  'northwind.s4.desc':
    '\uC81C\uD488, \uCE74\uD14C\uACE0\uB9AC, \uACF5\uAE09\uC5C5\uCCB4\uB294 \uC678\uB798 \uD0A4 \uCC38\uC870\uB97C \uD1B5\uD574 \uAD00\uB828\uB429\uB2C8\uB2E4. \uC774\uB97C \uB370\uC774\uD130 \uAD00\uACC4\uB85C \uC2B9\uACA9\uD558\uC5EC \uADF8\uB798\uD504\uB97C \uC2E4\uD604\uD558\uACA0\uC2B5\uB2C8\uB2E4.',
  'northwind.s5.title': '\uC81C\uD488 \uB370\uC774\uD130 \uCFFC\uB9AC',
  'northwind.s5.lead': '\uCFFC\uB9AC \uD328\uD134',
  'northwind.s5.desc':
    '\uD328\uD134\uC744 \uC0AC\uC6A9\uD55C \uCFFC\uB9AC\uB97C \uC2DC\uB3C4\uD574 \uBCF4\uACA0\uC2B5\uB2C8\uB2E4.',
  'northwind.s5.q1':
    '\uAC01 \uACF5\uAE09\uC5C5\uCCB4\uB294 \uC5B4\uB5A4 \uC885\uB958\uC758 \uC2DD\uD488\uC744 \uACF5\uAE09\uD558\uB098\uC694?',
  'northwind.s5.q2':
    '\uB18D\uC0B0\uBB3C \uACF5\uAE09\uC5C5\uCCB4 \uCC3E\uAE30.',
  'northwind.s6.title': '\uACE0\uAC1D \uC8FC\uBB38 \uB85C\uB4DC',
  'northwind.s6.lead':
    '\uC678\uBD80 CSV \uD30C\uC77C\uC5D0\uC11C \uACE0\uAC1D \uC8FC\uBB38 \uB370\uC774\uD130 \uB85C\uB4DC',
  'northwind.s6.desc':
    'Northwind \uACE0\uAC1D\uC740 \uC5EC\uB7EC \uC81C\uD488\uC744 \uC0C1\uC138\uD788 \uAE30\uC220\uD558\uB294 \uC8FC\uBB38\uC744 \uD569\uB2C8\uB2E4.',
  'northwind.s6.loadCustomer': '\uACE0\uAC1D \uB370\uC774\uD130 \uB85C\uB4DC.',
  'northwind.s6.loadOrder': '\uC8FC\uBB38 \uB370\uC774\uD130 \uB85C\uB4DC.',
  'northwind.s7.title':
    '\uACE0\uAC1D \uC8FC\uBB38 \uB370\uC774\uD130 \uC778\uB371\uC2F1',
  'northwind.s7.lead':
    '\uB77C\uBCA8 \uAE30\uBC18 \uB178\uB4DC \uC778\uB371\uC2A4 \uC0DD\uC131',
  'northwind.s8.title':
    '\uACE0\uAC1D \uC8FC\uBB38 \uB370\uC774\uD130 \uAD00\uACC4 \uC124\uC815',
  'northwind.s8.lead':
    '\uACE0\uAC1D\uACFC \uC8FC\uBB38 \uAC04 \uAD00\uACC4 \uC0DD\uC131',
  'northwind.s9.title':
    '\uACE0\uAC1D \uC8FC\uBB38 \uB370\uC774\uD130 \uC2B9\uACA9',
  'northwind.s9.lead':
    '\uC870\uC778 \uB808\uCF54\uB4DC\uB97C \uAD00\uACC4\uB85C \uBCC0\uD658',
  'northwind.s9.desc':
    'Order Details\uB294 \uD56D\uC0C1 \uC8FC\uBB38\uC758 \uC77C\uBD80\uC774\uBA70 Order\uC640 Product\uB97C \uC5F0\uACB0\uD569\uB2C8\uB2E4 \u2014 \uC870\uC778 \uD14C\uC774\uBE14\uC785\uB2C8\uB2E4. \uC870\uC778 \uD14C\uC774\uBE14\uC740 \uD56D\uC0C1 \uB370\uC774\uD130 \uAD00\uACC4\uC758 \uD45C\uC2DC\uC774\uBA70, \uB450 \uB808\uCF54\uB4DC \uAC04\uC758 \uACF5\uC720 \uC815\uBCF4\uB97C \uB098\uD0C0\uB0C5\uB2C8\uB2E4.',
  'northwind.s9.promote':
    '\uC5EC\uAE30\uC11C\uB294 \uAC01 OrderDetail \uB808\uCF54\uB4DC\uB97C \uADF8\uB798\uD504\uC758 \uAD00\uACC4\uB85C \uC9C1\uC811 \uC2B9\uACA9\uD569\uB2C8\uB2E4.',
  'northwind.s10.title': 'Northwind \uADF8\uB798\uD504 \uCFFC\uB9AC',
  'northwind.s10.lead': '\uCFFC\uB9AC \uD328\uD134',
  'northwind.s10.desc':
    '\uAC01 \uACE0\uAC1D\uC774 \uAD6C\uB9E4\uD55C \uC81C\uD488\uC740 \uBA87 \uAC1C\uC778\uAC00\uC694?',
  'northwind.s11.title': '\uCC38\uACE0 \uC790\uB8CC'
}

export type TranslationKey = keyof TranslationStrings

const translations: Record<Language, TranslationStrings> = { en, ko }

export default translations
