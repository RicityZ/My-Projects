<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Partial Class Dashboard
    Inherits System.Windows.Forms.Form

    'Form overrides dispose to clean up the component list.
    <System.Diagnostics.DebuggerNonUserCode()> _
    Protected Overrides Sub Dispose(ByVal disposing As Boolean)
        Try
            If disposing AndAlso components IsNot Nothing Then
                components.Dispose()
            End If
        Finally
            MyBase.Dispose(disposing)
        End Try
    End Sub

    'Required by the Windows Form Designer
    Private components As System.ComponentModel.IContainer

    'NOTE: The following procedure is required by the Windows Form Designer
    'It can be modified using the Windows Form Designer.  
    'Do not modify it using the code editor.
    <System.Diagnostics.DebuggerStepThrough()> _
    Private Sub InitializeComponent()
        Dim ChartArea9 As System.Windows.Forms.DataVisualization.Charting.ChartArea = New System.Windows.Forms.DataVisualization.Charting.ChartArea()
        Dim Legend9 As System.Windows.Forms.DataVisualization.Charting.Legend = New System.Windows.Forms.DataVisualization.Charting.Legend()
        Dim Series9 As System.Windows.Forms.DataVisualization.Charting.Series = New System.Windows.Forms.DataVisualization.Charting.Series()
        Dim ChartArea10 As System.Windows.Forms.DataVisualization.Charting.ChartArea = New System.Windows.Forms.DataVisualization.Charting.ChartArea()
        Dim Legend10 As System.Windows.Forms.DataVisualization.Charting.Legend = New System.Windows.Forms.DataVisualization.Charting.Legend()
        Dim Series10 As System.Windows.Forms.DataVisualization.Charting.Series = New System.Windows.Forms.DataVisualization.Charting.Series()
        Dim ChartArea11 As System.Windows.Forms.DataVisualization.Charting.ChartArea = New System.Windows.Forms.DataVisualization.Charting.ChartArea()
        Dim Legend11 As System.Windows.Forms.DataVisualization.Charting.Legend = New System.Windows.Forms.DataVisualization.Charting.Legend()
        Dim Series11 As System.Windows.Forms.DataVisualization.Charting.Series = New System.Windows.Forms.DataVisualization.Charting.Series()
        Dim ChartArea12 As System.Windows.Forms.DataVisualization.Charting.ChartArea = New System.Windows.Forms.DataVisualization.Charting.ChartArea()
        Dim Legend12 As System.Windows.Forms.DataVisualization.Charting.Legend = New System.Windows.Forms.DataVisualization.Charting.Legend()
        Dim Series12 As System.Windows.Forms.DataVisualization.Charting.Series = New System.Windows.Forms.DataVisualization.Charting.Series()
        Me.Panel1 = New System.Windows.Forms.Panel()
        Me.Panel2 = New System.Windows.Forms.Panel()
        Me.Label1 = New System.Windows.Forms.Label()
        Me.BackgroundWorker1 = New System.ComponentModel.BackgroundWorker()
        Me.ChartPosition = New System.Windows.Forms.DataVisualization.Charting.Chart()
        Me.ChartSex = New System.Windows.Forms.DataVisualization.Charting.Chart()
        Me.ChartPayType = New System.Windows.Forms.DataVisualization.Charting.Chart()
        Me.ChartSalary = New System.Windows.Forms.DataVisualization.Charting.Chart()
        Me.DashboardHOMEBUTT = New System.Windows.Forms.Button()
        Me.RequisitionHOMEBUTT = New System.Windows.Forms.Button()
        Me.SuppliersHOMEBUTT = New System.Windows.Forms.Button()
        Me.SuppliesBUTTHOME = New System.Windows.Forms.Button()
        Me.STAFFBUTTHOME = New System.Windows.Forms.Button()
        Me.PatientHOMEBUTT = New System.Windows.Forms.Button()
        Me.HOMEBUTT = New System.Windows.Forms.Button()
        Me.Panel1.SuspendLayout()
        Me.Panel2.SuspendLayout()
        CType(Me.ChartPosition, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.ChartSex, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.ChartPayType, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.ChartSalary, System.ComponentModel.ISupportInitialize).BeginInit()
        Me.SuspendLayout()
        '
        'Panel1
        '
        Me.Panel1.BackColor = System.Drawing.SystemColors.ActiveCaption
        Me.Panel1.Controls.Add(Me.DashboardHOMEBUTT)
        Me.Panel1.Controls.Add(Me.RequisitionHOMEBUTT)
        Me.Panel1.Controls.Add(Me.SuppliersHOMEBUTT)
        Me.Panel1.Controls.Add(Me.SuppliesBUTTHOME)
        Me.Panel1.Controls.Add(Me.STAFFBUTTHOME)
        Me.Panel1.Controls.Add(Me.PatientHOMEBUTT)
        Me.Panel1.Controls.Add(Me.HOMEBUTT)
        Me.Panel1.Location = New System.Drawing.Point(1, 1)
        Me.Panel1.Name = "Panel1"
        Me.Panel1.Size = New System.Drawing.Size(125, 659)
        Me.Panel1.TabIndex = 1
        '
        'Panel2
        '
        Me.Panel2.BackColor = System.Drawing.SystemColors.ActiveCaption
        Me.Panel2.Controls.Add(Me.Label1)
        Me.Panel2.Location = New System.Drawing.Point(125, 1)
        Me.Panel2.Name = "Panel2"
        Me.Panel2.Size = New System.Drawing.Size(1061, 76)
        Me.Panel2.TabIndex = 113
        '
        'Label1
        '
        Me.Label1.AutoSize = True
        Me.Label1.Font = New System.Drawing.Font("Microsoft Sans Serif", 21.75!, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Label1.Location = New System.Drawing.Point(375, 28)
        Me.Label1.Name = "Label1"
        Me.Label1.Size = New System.Drawing.Size(166, 33)
        Me.Label1.TabIndex = 0
        Me.Label1.Text = "Dashboard"
        '
        'ChartPosition
        '
        ChartArea9.Name = "ChartArea1"
        Me.ChartPosition.ChartAreas.Add(ChartArea9)
        Legend9.Name = "Legend1"
        Me.ChartPosition.Legends.Add(Legend9)
        Me.ChartPosition.Location = New System.Drawing.Point(759, 83)
        Me.ChartPosition.Margin = New System.Windows.Forms.Padding(2, 2, 2, 2)
        Me.ChartPosition.Name = "ChartPosition"
        Series9.ChartArea = "ChartArea1"
        Series9.ChartType = System.Windows.Forms.DataVisualization.Charting.SeriesChartType.Bar
        Series9.Legend = "Legend1"
        Series9.Name = "Series1"
        Me.ChartPosition.Series.Add(Series9)
        Me.ChartPosition.Size = New System.Drawing.Size(316, 257)
        Me.ChartPosition.TabIndex = 115
        Me.ChartPosition.Text = "Chart2"
        '
        'ChartSex
        '
        ChartArea10.Name = "ChartArea1"
        Me.ChartSex.ChartAreas.Add(ChartArea10)
        Legend10.Name = "Legend1"
        Me.ChartSex.Legends.Add(Legend10)
        Me.ChartSex.Location = New System.Drawing.Point(231, 83)
        Me.ChartSex.Margin = New System.Windows.Forms.Padding(2, 2, 2, 2)
        Me.ChartSex.Name = "ChartSex"
        Me.ChartSex.Palette = System.Windows.Forms.DataVisualization.Charting.ChartColorPalette.SeaGreen
        Series10.ChartArea = "ChartArea1"
        Series10.ChartType = System.Windows.Forms.DataVisualization.Charting.SeriesChartType.Pie
        Series10.Legend = "Legend1"
        Series10.Name = "Series1"
        Me.ChartSex.Series.Add(Series10)
        Me.ChartSex.Size = New System.Drawing.Size(316, 257)
        Me.ChartSex.TabIndex = 117
        Me.ChartSex.Text = "ChartSex"
        '
        'ChartPayType
        '
        ChartArea11.Name = "ChartArea1"
        Me.ChartPayType.ChartAreas.Add(ChartArea11)
        Legend11.Name = "Legend1"
        Me.ChartPayType.Legends.Add(Legend11)
        Me.ChartPayType.Location = New System.Drawing.Point(231, 360)
        Me.ChartPayType.Margin = New System.Windows.Forms.Padding(2, 2, 2, 2)
        Me.ChartPayType.Name = "ChartPayType"
        Me.ChartPayType.Palette = System.Windows.Forms.DataVisualization.Charting.ChartColorPalette.SeaGreen
        Series11.ChartArea = "ChartArea1"
        Series11.ChartType = System.Windows.Forms.DataVisualization.Charting.SeriesChartType.Pie
        Series11.Legend = "Legend1"
        Series11.Name = "Series1"
        Me.ChartPayType.Series.Add(Series11)
        Me.ChartPayType.Size = New System.Drawing.Size(316, 257)
        Me.ChartPayType.TabIndex = 118
        Me.ChartPayType.Text = "Chart1"
        '
        'ChartSalary
        '
        ChartArea12.Name = "ChartArea1"
        Me.ChartSalary.ChartAreas.Add(ChartArea12)
        Legend12.Name = "Legend1"
        Me.ChartSalary.Legends.Add(Legend12)
        Me.ChartSalary.Location = New System.Drawing.Point(759, 360)
        Me.ChartSalary.Margin = New System.Windows.Forms.Padding(2, 2, 2, 2)
        Me.ChartSalary.Name = "ChartSalary"
        Series12.ChartArea = "ChartArea1"
        Series12.Legend = "Legend1"
        Series12.Name = "Series1"
        Me.ChartSalary.Series.Add(Series12)
        Me.ChartSalary.Size = New System.Drawing.Size(316, 257)
        Me.ChartSalary.TabIndex = 119
        Me.ChartSalary.Text = "Chart3"
        '
        'DashboardHOMEBUTT
        '
        Me.DashboardHOMEBUTT.Location = New System.Drawing.Point(11, 450)
        Me.DashboardHOMEBUTT.Name = "DashboardHOMEBUTT"
        Me.DashboardHOMEBUTT.Size = New System.Drawing.Size(94, 54)
        Me.DashboardHOMEBUTT.TabIndex = 27
        Me.DashboardHOMEBUTT.Text = "Dashboard"
        Me.DashboardHOMEBUTT.UseVisualStyleBackColor = True
        '
        'RequisitionHOMEBUTT
        '
        Me.RequisitionHOMEBUTT.Location = New System.Drawing.Point(11, 382)
        Me.RequisitionHOMEBUTT.Name = "RequisitionHOMEBUTT"
        Me.RequisitionHOMEBUTT.Size = New System.Drawing.Size(94, 54)
        Me.RequisitionHOMEBUTT.TabIndex = 26
        Me.RequisitionHOMEBUTT.Text = "Requisition"
        Me.RequisitionHOMEBUTT.UseVisualStyleBackColor = True
        '
        'SuppliersHOMEBUTT
        '
        Me.SuppliersHOMEBUTT.Location = New System.Drawing.Point(11, 308)
        Me.SuppliersHOMEBUTT.Name = "SuppliersHOMEBUTT"
        Me.SuppliersHOMEBUTT.Size = New System.Drawing.Size(94, 54)
        Me.SuppliersHOMEBUTT.TabIndex = 25
        Me.SuppliersHOMEBUTT.Text = "Suppliers"
        Me.SuppliersHOMEBUTT.UseVisualStyleBackColor = True
        '
        'SuppliesBUTTHOME
        '
        Me.SuppliesBUTTHOME.Location = New System.Drawing.Point(11, 236)
        Me.SuppliesBUTTHOME.Name = "SuppliesBUTTHOME"
        Me.SuppliesBUTTHOME.Size = New System.Drawing.Size(94, 54)
        Me.SuppliesBUTTHOME.TabIndex = 24
        Me.SuppliesBUTTHOME.Text = "Supplies"
        Me.SuppliesBUTTHOME.UseVisualStyleBackColor = True
        '
        'STAFFBUTTHOME
        '
        Me.STAFFBUTTHOME.Location = New System.Drawing.Point(11, 95)
        Me.STAFFBUTTHOME.Name = "STAFFBUTTHOME"
        Me.STAFFBUTTHOME.Size = New System.Drawing.Size(94, 54)
        Me.STAFFBUTTHOME.TabIndex = 23
        Me.STAFFBUTTHOME.Text = "STAFF"
        Me.STAFFBUTTHOME.UseVisualStyleBackColor = True
        '
        'PatientHOMEBUTT
        '
        Me.PatientHOMEBUTT.Location = New System.Drawing.Point(11, 165)
        Me.PatientHOMEBUTT.Name = "PatientHOMEBUTT"
        Me.PatientHOMEBUTT.Size = New System.Drawing.Size(94, 54)
        Me.PatientHOMEBUTT.TabIndex = 22
        Me.PatientHOMEBUTT.Text = "Patient"
        Me.PatientHOMEBUTT.UseVisualStyleBackColor = True
        '
        'HOMEBUTT
        '
        Me.HOMEBUTT.Location = New System.Drawing.Point(11, 22)
        Me.HOMEBUTT.Name = "HOMEBUTT"
        Me.HOMEBUTT.Size = New System.Drawing.Size(94, 54)
        Me.HOMEBUTT.TabIndex = 21
        Me.HOMEBUTT.Text = "HOME"
        Me.HOMEBUTT.UseVisualStyleBackColor = True
        '
        'Dashboard
        '
        Me.AutoScaleDimensions = New System.Drawing.SizeF(6.0!, 13.0!)
        Me.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font
        Me.ClientSize = New System.Drawing.Size(1123, 625)
        Me.Controls.Add(Me.ChartSalary)
        Me.Controls.Add(Me.ChartPayType)
        Me.Controls.Add(Me.ChartSex)
        Me.Controls.Add(Me.ChartPosition)
        Me.Controls.Add(Me.Panel2)
        Me.Controls.Add(Me.Panel1)
        Me.Margin = New System.Windows.Forms.Padding(2, 2, 2, 2)
        Me.Name = "Dashboard"
        Me.Text = "Dashboard"
        Me.Panel1.ResumeLayout(False)
        Me.Panel2.ResumeLayout(False)
        Me.Panel2.PerformLayout()
        CType(Me.ChartPosition, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.ChartSex, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.ChartPayType, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.ChartSalary, System.ComponentModel.ISupportInitialize).EndInit()
        Me.ResumeLayout(False)

    End Sub

    Friend WithEvents Panel1 As Panel
    Friend WithEvents Panel2 As Panel
    Friend WithEvents Label1 As Label
    Friend WithEvents BackgroundWorker1 As System.ComponentModel.BackgroundWorker
    Friend WithEvents ChartPosition As DataVisualization.Charting.Chart
    Friend WithEvents ChartSex As DataVisualization.Charting.Chart
    Friend WithEvents ChartPayType As DataVisualization.Charting.Chart
    Friend WithEvents ChartSalary As DataVisualization.Charting.Chart
    Friend WithEvents DashboardHOMEBUTT As Button
    Friend WithEvents RequisitionHOMEBUTT As Button
    Friend WithEvents SuppliersHOMEBUTT As Button
    Friend WithEvents SuppliesBUTTHOME As Button
    Friend WithEvents STAFFBUTTHOME As Button
    Friend WithEvents PatientHOMEBUTT As Button
    Friend WithEvents HOMEBUTT As Button
End Class
