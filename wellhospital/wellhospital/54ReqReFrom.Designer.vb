<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Partial Class ReqReFrom
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
        Me.Panel2 = New System.Windows.Forms.Panel()
        Me.Label1 = New System.Windows.Forms.Label()
        Me.Panel1 = New System.Windows.Forms.Panel()
        Me.Label9 = New System.Windows.Forms.Label()
        Me.ComboBox1 = New System.Windows.Forms.ComboBox()
        Me.DataGridView1 = New System.Windows.Forms.DataGridView()
        Me.ButtonSearch = New System.Windows.Forms.Button()
        Me.Label6 = New System.Windows.Forms.Label()
        Me.TextBoxID = New System.Windows.Forms.TextBox()
        Me.DashboardHOMEBUTT = New System.Windows.Forms.Button()
        Me.RequisitionHOMEBUTT = New System.Windows.Forms.Button()
        Me.SuppliersHOMEBUTT = New System.Windows.Forms.Button()
        Me.SuppliesBUTTHOME = New System.Windows.Forms.Button()
        Me.STAFFBUTTHOME = New System.Windows.Forms.Button()
        Me.PatientHOMEBUTT = New System.Windows.Forms.Button()
        Me.HOMEBUTT = New System.Windows.Forms.Button()
        Me.Panel2.SuspendLayout()
        Me.Panel1.SuspendLayout()
        CType(Me.DataGridView1, System.ComponentModel.ISupportInitialize).BeginInit()
        Me.SuspendLayout()
        '
        'Panel2
        '
        Me.Panel2.BackColor = System.Drawing.SystemColors.ActiveCaption
        Me.Panel2.Controls.Add(Me.Label1)
        Me.Panel2.Location = New System.Drawing.Point(121, 0)
        Me.Panel2.Name = "Panel2"
        Me.Panel2.Size = New System.Drawing.Size(1061, 76)
        Me.Panel2.TabIndex = 112
        '
        'Label1
        '
        Me.Label1.AutoSize = True
        Me.Label1.Font = New System.Drawing.Font("Microsoft Sans Serif", 21.75!, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Label1.Location = New System.Drawing.Point(183, 23)
        Me.Label1.Name = "Label1"
        Me.Label1.Size = New System.Drawing.Size(394, 33)
        Me.Label1.TabIndex = 0
        Me.Label1.Text = "Requisition Recvive Report"
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
        Me.Panel1.Location = New System.Drawing.Point(0, 0)
        Me.Panel1.Name = "Panel1"
        Me.Panel1.Size = New System.Drawing.Size(125, 659)
        Me.Panel1.TabIndex = 111
        '
        'Label9
        '
        Me.Label9.AutoSize = True
        Me.Label9.Font = New System.Drawing.Font("Microsoft Sans Serif", 10.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Label9.Location = New System.Drawing.Point(475, 213)
        Me.Label9.Margin = New System.Windows.Forms.Padding(2, 0, 2, 0)
        Me.Label9.Name = "Label9"
        Me.Label9.Size = New System.Drawing.Size(86, 17)
        Me.Label9.TabIndex = 164
        Me.Label9.Text = "Item or Drug"
        '
        'ComboBox1
        '
        Me.ComboBox1.FormattingEnabled = True
        Me.ComboBox1.Items.AddRange(New Object() {"Item", "Drug"})
        Me.ComboBox1.Location = New System.Drawing.Point(445, 231)
        Me.ComboBox1.Margin = New System.Windows.Forms.Padding(2, 2, 2, 2)
        Me.ComboBox1.Name = "ComboBox1"
        Me.ComboBox1.RightToLeft = System.Windows.Forms.RightToLeft.No
        Me.ComboBox1.Size = New System.Drawing.Size(158, 21)
        Me.ComboBox1.TabIndex = 163
        '
        'DataGridView1
        '
        Me.DataGridView1.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize
        Me.DataGridView1.Location = New System.Drawing.Point(173, 260)
        Me.DataGridView1.Margin = New System.Windows.Forms.Padding(2, 2, 2, 2)
        Me.DataGridView1.Name = "DataGridView1"
        Me.DataGridView1.RowHeadersWidth = 62
        Me.DataGridView1.RowTemplate.Height = 28
        Me.DataGridView1.Size = New System.Drawing.Size(705, 281)
        Me.DataGridView1.TabIndex = 162
        '
        'ButtonSearch
        '
        Me.ButtonSearch.BackColor = System.Drawing.SystemColors.Control
        Me.ButtonSearch.Font = New System.Drawing.Font("Microsoft Sans Serif", 14.25!, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.ButtonSearch.ForeColor = System.Drawing.SystemColors.ActiveCaptionText
        Me.ButtonSearch.Location = New System.Drawing.Point(383, 127)
        Me.ButtonSearch.Name = "ButtonSearch"
        Me.ButtonSearch.Size = New System.Drawing.Size(94, 34)
        Me.ButtonSearch.TabIndex = 161
        Me.ButtonSearch.Text = "Search"
        Me.ButtonSearch.UseVisualStyleBackColor = False
        '
        'Label6
        '
        Me.Label6.AutoSize = True
        Me.Label6.Font = New System.Drawing.Font("Microsoft Sans Serif", 10.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Label6.Location = New System.Drawing.Point(213, 120)
        Me.Label6.Margin = New System.Windows.Forms.Padding(2, 0, 2, 0)
        Me.Label6.Name = "Label6"
        Me.Label6.Size = New System.Drawing.Size(21, 17)
        Me.Label6.TabIndex = 160
        Me.Label6.Text = "ID"
        '
        'TextBoxID
        '
        Me.TextBoxID.Location = New System.Drawing.Point(217, 138)
        Me.TextBoxID.Margin = New System.Windows.Forms.Padding(2, 2, 2, 2)
        Me.TextBoxID.Name = "TextBoxID"
        Me.TextBoxID.Size = New System.Drawing.Size(155, 20)
        Me.TextBoxID.TabIndex = 159
        '
        'DashboardHOMEBUTT
        '
        Me.DashboardHOMEBUTT.Location = New System.Drawing.Point(12, 451)
        Me.DashboardHOMEBUTT.Name = "DashboardHOMEBUTT"
        Me.DashboardHOMEBUTT.Size = New System.Drawing.Size(94, 54)
        Me.DashboardHOMEBUTT.TabIndex = 27
        Me.DashboardHOMEBUTT.Text = "Dashboard"
        Me.DashboardHOMEBUTT.UseVisualStyleBackColor = True
        '
        'RequisitionHOMEBUTT
        '
        Me.RequisitionHOMEBUTT.Location = New System.Drawing.Point(12, 383)
        Me.RequisitionHOMEBUTT.Name = "RequisitionHOMEBUTT"
        Me.RequisitionHOMEBUTT.Size = New System.Drawing.Size(94, 54)
        Me.RequisitionHOMEBUTT.TabIndex = 26
        Me.RequisitionHOMEBUTT.Text = "Requisition"
        Me.RequisitionHOMEBUTT.UseVisualStyleBackColor = True
        '
        'SuppliersHOMEBUTT
        '
        Me.SuppliersHOMEBUTT.Location = New System.Drawing.Point(12, 309)
        Me.SuppliersHOMEBUTT.Name = "SuppliersHOMEBUTT"
        Me.SuppliersHOMEBUTT.Size = New System.Drawing.Size(94, 54)
        Me.SuppliersHOMEBUTT.TabIndex = 25
        Me.SuppliersHOMEBUTT.Text = "Suppliers"
        Me.SuppliersHOMEBUTT.UseVisualStyleBackColor = True
        '
        'SuppliesBUTTHOME
        '
        Me.SuppliesBUTTHOME.Location = New System.Drawing.Point(12, 237)
        Me.SuppliesBUTTHOME.Name = "SuppliesBUTTHOME"
        Me.SuppliesBUTTHOME.Size = New System.Drawing.Size(94, 54)
        Me.SuppliesBUTTHOME.TabIndex = 24
        Me.SuppliesBUTTHOME.Text = "Supplies"
        Me.SuppliesBUTTHOME.UseVisualStyleBackColor = True
        '
        'STAFFBUTTHOME
        '
        Me.STAFFBUTTHOME.Location = New System.Drawing.Point(12, 96)
        Me.STAFFBUTTHOME.Name = "STAFFBUTTHOME"
        Me.STAFFBUTTHOME.Size = New System.Drawing.Size(94, 54)
        Me.STAFFBUTTHOME.TabIndex = 23
        Me.STAFFBUTTHOME.Text = "STAFF"
        Me.STAFFBUTTHOME.UseVisualStyleBackColor = True
        '
        'PatientHOMEBUTT
        '
        Me.PatientHOMEBUTT.Location = New System.Drawing.Point(12, 166)
        Me.PatientHOMEBUTT.Name = "PatientHOMEBUTT"
        Me.PatientHOMEBUTT.Size = New System.Drawing.Size(94, 54)
        Me.PatientHOMEBUTT.TabIndex = 22
        Me.PatientHOMEBUTT.Text = "Patient"
        Me.PatientHOMEBUTT.UseVisualStyleBackColor = True
        '
        'HOMEBUTT
        '
        Me.HOMEBUTT.Location = New System.Drawing.Point(12, 23)
        Me.HOMEBUTT.Name = "HOMEBUTT"
        Me.HOMEBUTT.Size = New System.Drawing.Size(94, 54)
        Me.HOMEBUTT.TabIndex = 21
        Me.HOMEBUTT.Text = "HOME"
        Me.HOMEBUTT.UseVisualStyleBackColor = True
        '
        'ReqReFrom
        '
        Me.AutoScaleDimensions = New System.Drawing.SizeF(6.0!, 13.0!)
        Me.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font
        Me.ClientSize = New System.Drawing.Size(919, 614)
        Me.Controls.Add(Me.Label9)
        Me.Controls.Add(Me.ComboBox1)
        Me.Controls.Add(Me.DataGridView1)
        Me.Controls.Add(Me.ButtonSearch)
        Me.Controls.Add(Me.Label6)
        Me.Controls.Add(Me.TextBoxID)
        Me.Controls.Add(Me.Panel2)
        Me.Controls.Add(Me.Panel1)
        Me.Margin = New System.Windows.Forms.Padding(2, 2, 2, 2)
        Me.Name = "ReqReFrom"
        Me.Text = "ReqReFrom"
        Me.Panel2.ResumeLayout(False)
        Me.Panel2.PerformLayout()
        Me.Panel1.ResumeLayout(False)
        CType(Me.DataGridView1, System.ComponentModel.ISupportInitialize).EndInit()
        Me.ResumeLayout(False)
        Me.PerformLayout()

    End Sub

    Friend WithEvents Panel2 As Panel
    Friend WithEvents Label1 As Label
    Friend WithEvents Panel1 As Panel
    Friend WithEvents Label9 As Label
    Friend WithEvents ComboBox1 As ComboBox
    Friend WithEvents DataGridView1 As DataGridView
    Friend WithEvents ButtonSearch As Button
    Friend WithEvents Label6 As Label
    Friend WithEvents TextBoxID As TextBox
    Friend WithEvents DashboardHOMEBUTT As Button
    Friend WithEvents RequisitionHOMEBUTT As Button
    Friend WithEvents SuppliersHOMEBUTT As Button
    Friend WithEvents SuppliesBUTTHOME As Button
    Friend WithEvents STAFFBUTTHOME As Button
    Friend WithEvents PatientHOMEBUTT As Button
    Friend WithEvents HOMEBUTT As Button
End Class
